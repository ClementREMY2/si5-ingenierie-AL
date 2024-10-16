from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS
import paho.mqtt.client as mqtt
import os
import json
import sys
import threading

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

data_queue = []  # Queue to store data to be sent (in case of problem when storing)
data_queue_lock = threading.Lock()
data_process_timer = None  # Timer to process data in the queue

def process_waiting_data():
    print("Processing waiting data")
    global data_queue
    temp_queue = []

    with data_queue_lock:
        temp_queue = data_queue
        data_queue = []

    if len(temp_queue) == 0:
        return
    else:
        print(f"Processing {len(temp_queue)} data in the queue")
        if REALTIME_ACTIVATED:
            for data in temp_queue:
                send_realtime(data)
        else:
            for data in temp_queue:
                store(data)

def init_mqtt_client():
    global mqtt_client
    if mqtt_client is None:
        mqtt_client = mqtt.Client()
        mqtt_client.connect(mqtt_broker_address, mqtt_broker_port, 60)
        mqtt_client.loop_start()
        print(f"MQTT client initialized and connected to {mqtt_broker_address}:{mqtt_broker_port}")

def init_influxdb_client():
    global influxdb_client, write_api
    if influxdb_client is None and write_api is None:
        influxdb_client = InfluxDBClient(token=influxdb_token,
                         url=influxdb_url,
                         org=influxdb_org,
                         username=influxdb_user,
                        password=influxdb_password)
        write_api = influxdb_client.write_api(write_options=SYNCHRONOUS)
        print(f"InfluxDB client initialized and connected to {influxdb_url}")

def send_realtime(data):
    global mqtt_client

    # Initialize the MQTT client if it hasn't been initialized yet
    init_mqtt_client()

    topic = "sensor/data"
    message = json.dumps(data)
    print(f"Data to be sent to MQTT broker: {message}")
    # Send the data to the MQTT broker as json
    mqtt_client.publish(topic, message)
    print(f"Data sent to MQTT broker: {message}")
    sys.stdout.flush()

def store(data):
    global influxdb_client, write_api

    # Initialize the InfluxDB client if it hasn't been initialized yet
    init_influxdb_client()

    p = Point("sensors").tag("id", data['id']).tag("type", data['type']).field("value", data['value']).time(data['timestamp'])
    try:
        write_api.write(bucket=influxdb_bucket, record=p)
    except Exception as e:
        print(f"Error storing data in InfluxDB: {e}")
        sys.stdout.flush()
        
        with data_queue_lock:
            data_queue.append(data)

        # Process the data in the queue
        global data_process_timer
        with data_queue_lock:
            if data_process_timer is not None:
                data_process_timer.cancel()
            data_process_timer = threading.Timer(10, process_waiting_data)
            data_process_timer.start()

        return

    print(f"Data stored in InfluxDB: {data}")
    sys.stdout.flush()
