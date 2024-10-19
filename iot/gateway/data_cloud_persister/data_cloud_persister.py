from influxdb_client import InfluxDBClient
import paho.mqtt.client as mqtt
import os
import json
import sys
import time
import datetime

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

REALTIME_ACTIVATED = False

# IMPORTANT: At timezone UTC
def get_current_time_iso(time):
    formatted_time = time.strftime("%Y-%m-%dT%H:%M:%SZ")
    return formatted_time

DELETE_API_START_DATE = get_current_time_iso(datetime.date.fromtimestamp(0))

mqtt_connection = None  # Global variable to store the MQTT client
def get_mqtt_client():
    global mqtt_connection
    if mqtt_connection is None:
        mqtt_connection = mqtt.Client()
        mqtt_connection.connect(MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT, 60)
        mqtt_connection.loop_start()
        print(f"MQTT client initialized and connected to {MQTT_BROKER_ADDRESS}:{MQTT_BROKER_PORT}")

    return mqtt_connection

influxdb_connection = None  # Global variable to store the InfluxDB client
def get_influxdb_client():
    global influxdb_connection
    if influxdb_connection is None:
        influxdb_connection = InfluxDBClient(token=INFLUXDB_TOKEN,
            url=INFLUXDB_URL,
            org=INFLUXDB_ORG,
            username=INFLUXDB_USER,
            password=INFLUXDB_PASSWORD)
        print(f"InfluxDB client initialized and connected to {INFLUXDB_URL}")

    return influxdb_connection

def send_to_cloud(data_array, sensor):
    mqtt_client = get_mqtt_client()
    topic = "sensor/data"

    last_message_sent = None

    for data in data_array:
        message = json.dumps(data)
        try:
            # Send the data to the MQTT broker as json
            mqtt_client.publish(topic, message)
            last_message_sent = data
        except Exception as e:
            print(f"Error sending data to MQTT broker: {e}")
            sys.stdout.flush()
            return last_message_sent
    print(f"Data sent to cloud for sensor {sensor} ({len(data_array)} records)")
    sys.stdout.flush()
    return last_message_sent

def delete_data(sensor, max_date_iso):
    mqtt_client = get_influxdb_client()
    delete_api = mqtt_client.delete_api()

    # Delete data from the local database
    delete_api.delete(start=DELETE_API_START_DATE, stop=max_date_iso, bucket=INFLUXDB_BUCKET, org=INFLUXDB_ORG, predicate=f'_measurement="sensors" AND type="{sensor}"')

    print(f"Data deleted from local database for sensor {sensor} until {max_date_iso}")

def read_from_local_db():
    print("Reading data from local database")

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
            print(f"Error querying data from InfluxDB: {e}")
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
    read_from_local_db_scheduler()