from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS
import paho.mqtt.client as mqtt
import os
import json
import sys
import threading

MQTT_BROKER_ADDRESS = os.getenv('SENSOR_DATA_MQTT_BROKER_ADDRESS', 'localhost')
MQTT_BROKER_PORT = int(os.getenv('SENSOR_DATA_MQTT_BROKER_PORT', '2085'))

INFLUXDB_USER = os.getenv('INFLUXDB_ADMIN_USER', '')
INFLUXDB_PASSWORD = os.getenv('INFLUXDB_ADMIN_PASSWORD', '')
INFLUXDB_URL = os.getenv('INFLUXDB_URL', '')
INFLUXDB_ORG = os.getenv('INFLUXDB_ORG', '')
INFLUXDB_BUCKET = os.getenv('INFLUXDB_BUCKET', '')
INFLUXDB_TOKEN = os.getenv('INFLUXDB_TOKEN', '')

PATIENT_ID = os.getenv('PATIENT_ID', '')

REALTIME_ACTIVATED = False

data_queue = []  # Queue to store data to be sent (in case of problem when storing)
data_queue_lock = threading.Lock()
data_process_timer = None  # Timer to process data in the queue

def process_waiting_data():
    temp_queue = []

    with data_queue_lock:
        global data_queue
        temp_queue = data_queue
        data_queue = []

    if len(temp_queue) == 0:
        return
    else:
        print(f"[PROCESSING] Processing {len(temp_queue)} data in the local queue")
        sys.stdout.flush()
        if REALTIME_ACTIVATED:
            for data in temp_queue:
                send_realtime(data)
        else:
            for data in temp_queue:
                store(data)

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

def send_realtime(data):
    mqtt_client = get_mqtt_client()

    topic = "patient/" + PATIENT_ID + "/sensor/" + data['type']
    message = json.dumps(data)

    # Send the data to the MQTT broker as json
    try:
        mqtt_client.publish(topic, message)
    except Exception as e:
        print(f"[MQTT] Error sending data to MQTT broker: {e}")
        sys.stdout.flush()
        
        put_local_queue(data)
        return

    print(f"[PROCESSING] Data sent to MQTT broker on topic '{topic}': {message}")
    sys.stdout.flush()

def store(data):
    influxdb_client = get_influxdb_client()
    write_api = influxdb_client.write_api(write_options=SYNCHRONOUS)

    p = Point("sensors").tag("id", data['id']).tag("type", data['type']).field("value", data['value']).time(data['timestamp'])
    try:
        write_api.write(bucket=INFLUXDB_BUCKET, record=p)
    except Exception as e:
        print(f"[INFLUXDB] Error storing data in InfluxDB: {e}")
        sys.stdout.flush()
        
        put_local_queue(data)
        return

    print(f"[PROCESSING] Data stored in InfluxDB: {data}")
    sys.stdout.flush()

def put_local_queue(data):
    with data_queue_lock:
        data_queue.append(data)

        global data_process_timer
        # Schedule the data proccesing in the queue
        if data_process_timer is not None:
            data_process_timer.cancel()
        data_process_timer = threading.Timer(10, process_waiting_data)
        data_process_timer.start()
