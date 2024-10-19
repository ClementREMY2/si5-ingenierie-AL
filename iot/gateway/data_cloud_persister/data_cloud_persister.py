from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS
import paho.mqtt.client as mqtt
import os
import json
import sys
import time
import datetime

sensor_type = ['pulse_oximeter', 'blood_pressure', 'glycemia', 'heart_rate']

mqtt_broker_address = os.getenv('SENSOR_DATA_MQTT_BROKER_ADDRESS', 'localhost')
mqtt_broker_port = int(os.getenv('SENSOR_DATA_MQTT_BROKER_PORT', '2085'))

influxdb_user = os.getenv('INFLUXDB_ADMIN_USER', '')
influxdb_password = os.getenv('INFLUXDB_ADMIN_PASSWORD', '')
influxdb_url = os.getenv('INFLUXDB_URL', '')
influxdb_org = os.getenv('INFLUXDB_ORG', '')
influxdb_bucket = os.getenv('INFLUXDB_BUCKET', '')
influxdb_token = os.getenv('INFLUXDB_TOKEN', '')

REALTIME_ACTIVATED = False

mqtt_client = None  # Global variable to store the MQTT client
influxdb_client = None  # Global variable to store the InfluxDB client
write_api = None  # Global variable to store the write_api client
query_api = None  # Global variable to store the query_api client
delete_api = None  # Global variable to store the delete_api client

# IMPORTANT: At timezone UTC
def get_current_time_iso(time):
    formatted_time = time.strftime("%Y-%m-%dT%H:%M:%SZ")
    return formatted_time

def init_mqtt_client():
    global mqtt_client
    if mqtt_client is None:
        mqtt_client = mqtt.Client()
        mqtt_client.connect(mqtt_broker_address, mqtt_broker_port, 60)
        mqtt_client.loop_start()
        print(f"MQTT client initialized and connected to {mqtt_broker_address}:{mqtt_broker_port}")

def init_influxdb_client():
    global influxdb_client, write_api, query_api, delete_api
    if influxdb_client is None and write_api is None:
        influxdb_client = InfluxDBClient(token=influxdb_token,
                         url=influxdb_url,
                         org=influxdb_org,
                         username=influxdb_user,
                        password=influxdb_password)
        write_api = influxdb_client.write_api(write_options=SYNCHRONOUS)
        query_api = influxdb_client.query_api()
        delete_api = influxdb_client.delete_api()
        print(f"InfluxDB client initialized and connected to {influxdb_url}")

def send_to_cloud(data_array, sensor_type):
    global mqtt_client

    # Initialize the MQTT client if it hasn't been initialized yet
    init_mqtt_client()

    topic = "sensor/data"
    for data in data_array:
        message = json.dumps(data)
        # Send the data to the MQTT broker as json
        mqtt_client.publish(topic, message)
    print(f"Data sent to cloud for sensor {sensor_type}: {len(data_array)} records")
    sys.stdout.flush()

def delete_data(sensor_type, max_date):
    global delete_api

    # Initialize the InfluxDB client if it hasn't been initialized yet
    init_influxdb_client()
    
    start = get_current_time_iso(datetime.date.fromtimestamp(0))
    stop = get_current_time_iso(max_date)

    # Delete data from the local database
    delete_api.delete(start=start, stop=stop, bucket=influxdb_bucket, org=influxdb_org, predicate=f'_measurement="sensors" AND type="{sensor_type}"')
    
    print(f"Data deleted from local database for sensor {sensor_type} from {start} until {stop}")

def read_from_local_db():
    print("Reading data from local database")
    global influxdb_client, write_api, query_api

    # Initialize the InfluxDB client if it hasn't been initialized yet
    init_influxdb_client()

    # For each sensor type, read all available data from the local database
    for sensor in sensor_type:
        query = f'from(bucket: "{influxdb_bucket}") |> range(start: 0) |> filter(fn: (r) => r._measurement == "sensors") |> filter(fn: (r) => r.type == "{sensor}")'
        result = None

        try:
            result = query_api.query(org=influxdb_org ,query=query)
        except Exception as e:
            print(f"Error querying data from InfluxDB: {e}")
            sys.stdout.flush()
            continue

        json_result = []
        # JSON format :
        # {"id": "4392", "type": "blood_pressure", "value": 109.4173495189936, "timestamp": "2024-10-16T15:12:27Z"}

        max_data_for_delete = 0

        for table in result:
            for record in table.records:
                # results.append((record.get_field(), record.get_value()))
                # print(f"FIELDS: {record.get_field()} \n VALUES: {record.get_value()}")
                # print(f"Record: {record.values}")
                values = record.values
                json_result.append({
                    "id": values.get("id"),
                    "type": values.get("type"),
                    "value": values.get("_value"),
                    "timestamp": get_current_time_iso(values.get("_time"))
                })

                # The last record read will have the highest timestamp
                max_data_for_delete = values.get("_time")

        # print(f"Data read from local database for sensor {sensor}: {json_result}")
        send_to_cloud(json_result, sensor)

        delete_data(sensor, max_data_for_delete)

# Run read_from_local_db every 20 seconds
def read_from_local_db_scheduler():
    while True:
        read_from_local_db()
        time.sleep(5)

if __name__ == '__main__':
    read_from_local_db_scheduler()