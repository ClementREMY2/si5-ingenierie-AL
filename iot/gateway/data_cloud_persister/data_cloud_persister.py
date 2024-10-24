import datetime
import json
import os
import sys
import threading
import time
import settings.settings as settings
import receivers.wifi as wifi

import paho.mqtt.client as mqtt
from influxdb_client import InfluxDBClient

# In minutes
SCHEDULE_INTERVAL_MINUTES = 0.1

SENSOR_TYPE = ['pulse_oximeter', 'blood_pressure', 'glycemia', 'heart_rate']

MQTT_BROKER_ADDRESS = os.getenv('SENSOR_DATA_MQTT_BROKER_ADDRESS', 'localhost')
MQTT_BROKER_PORT = int(os.getenv('SENSOR_DATA_MQTT_BROKER_PORT', '2085'))

INFLUXDB_USER = os.getenv('INFLUXDB_ADMIN_USER', '')
INFLUXDB_PASSWORD = os.getenv('INFLUXDB_ADMIN_PASSWORD', '')
INFLUXDB_URL = os.getenv('INFLUXDB_URL', '')
INFLUXDB_ORG = os.getenv('INFLUXDB_ORG', '')
INFLUXDB_BUCKET = os.getenv('INFLUXDB_BUCKET', '')
INFLUXDB_TOKEN = os.getenv('INFLUXDB_TOKEN', '')

PATIENT_ID = os.getenv('PATIENT_ID', '')

# TODO : faire que dès qu'on passe à True, envoyer les données restantes dans la DB locale
REALTIME_ACTIVATED = False

# IMPORTANT: At timezone UTC
def get_current_time_iso(time):
    formatted_time = time.strftime("%Y-%m-%dT%H:%M:%SZ")
    return formatted_time

DELETE_API_START_DATE = get_current_time_iso(datetime.date.fromtimestamp(0))

connection_lock = threading.Lock()

mqtt_connection = None  # Global variable to store the MQTT client
def get_mqtt_client():
    with connection_lock:
        global mqtt_connection
        if mqtt_connection is None:
            mqtt_connection = mqtt.Client()
            mqtt_connection.connect(MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT, 60)
            mqtt_connection.loop_start()
            print(f"[MQTT] Client initialized and connected to {MQTT_BROKER_ADDRESS}:{MQTT_BROKER_PORT}")
            sys.stdout.flush()

        return mqtt_connection

influxdb_connection = None  # Global variable to store the InfluxDB client
def get_influxdb_client():
    with connection_lock:
        global influxdb_connection
        if influxdb_connection is None:
            influxdb_connection = InfluxDBClient(token=INFLUXDB_TOKEN,
                url=INFLUXDB_URL,
                org=INFLUXDB_ORG,
                username=INFLUXDB_USER,
                password=INFLUXDB_PASSWORD)
            print(f"[INFLUXDB] Client initialized and connected to {INFLUXDB_URL}")
            sys.stdout.flush()

        return influxdb_connection

def send_to_cloud(data_array, sensor):
    mqtt_client = get_mqtt_client()
    topic = "patient/" + PATIENT_ID + "/sensor/" + sensor

    last_message_sent = None

    for data in data_array:
        message = json.dumps(data)
        try:
            # Send the data to the MQTT broker as json
            mqtt_client.publish(topic, message)
            last_message_sent = data
        except Exception as e:
            print(f"[MQTT] Error sending data to MQTT broker: {e}")
            sys.stdout.flush()
            return last_message_sent
    print(f"[PERSISTER] Data sent to cloud for sensor {sensor} ({len(data_array)} records on topic '{topic}')")
    sys.stdout.flush()
    return last_message_sent

def delete_data(sensor, max_date_iso):
    mqtt_client = get_influxdb_client()
    delete_api = mqtt_client.delete_api()

    # Delete data from the local database
    delete_api.delete(start=DELETE_API_START_DATE, stop=max_date_iso, bucket=INFLUXDB_BUCKET, org=INFLUXDB_ORG, predicate=f'_measurement="sensors" AND type="{sensor}"')

    print(f"[PERSISTER] Data deleted from local database for sensor {sensor} until {max_date_iso}")
    sys.stdout.flush()

def read_from_local_db():
    print("[PERSISTER] Reading data from local database")
    sys.stdout.flush()

    # Initialize the InfluxDB client if it hasn't been initialized yet
    mqtt_client = get_influxdb_client()
    query_api = mqtt_client.query_api()

    # For each sensor type, read all available data from the local database
    for sensor in SENSOR_TYPE:
        query = f'from(bucket: "{INFLUXDB_BUCKET}") |> range(start: 0) |> filter(fn: (r) => r._measurement == "sensors") |> filter(fn: (r) => r.type == "{sensor}")'
        result = None

        try:
            result = query_api.query(org=INFLUXDB_ORG ,query=query)
        except Exception as e:
            print(f"[INFLUXDB] Error querying data from InfluxDB: {e}")
            sys.stdout.flush()
            continue

        json_result = []
        # JSON format : {"id": "4392", "type": "blood_pressure", "value": 109.4173495189936, "timestamp": "2024-10-16T15:12:27Z"}

        # Transform the result into a JSON array
        for table in result:
            for record in table.records:
                values = record.values
                json_result.append({
                    "id": values.get("id"),
                    "type": values.get("type"),
                    "value": values.get("_value"),
                    "timestamp": get_current_time_iso(values.get("_time"))
                })

        #  If there is no data, continue to the next sensor
        if (len(json_result) == 0):
            continue

        # Data are in timestamp order, so we can get the last date to know until which date we have sent data (and delete it)
        last_message_sent = send_to_cloud(json_result, sensor)

        if last_message_sent is not None:
            delete_data(sensor, last_message_sent['timestamp'])

# Run read_from_local_db at a regular interval
def read_from_local_db_scheduler():
    while True:
        read_from_local_db()
        time.sleep(SCHEDULE_INTERVAL_MINUTES * 60)

if __name__ == '__main__':
    # Load settings
    settings.init()

    # Launched scheduler & wifi receiver in separate threads
    wifi_thread = threading.Thread(target=wifi.init)
    db_reader_thread = threading.Thread(target=read_from_local_db_scheduler)

    wifi_thread.start()
    db_reader_thread.start()

    wifi_thread.join()
    db_reader_thread.join()