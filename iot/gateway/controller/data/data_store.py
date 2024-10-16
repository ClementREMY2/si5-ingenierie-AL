import data.filterer as filterer
import data.alert_checker as alert_checker
import paho.mqtt.client as mqtt
import os
import json
import sys

REALTIME_ACTIVATED = False
mqtt_client = None  # Global variable to store the MQTT client

def init_mqtt_client():
    global mqtt_client
    if mqtt_client is None:
        broker_address = os.getenv('SENSOR_DATA_MQTT_BROKER_ADDRESS', 'localhost')
        broker_port = int(os.getenv('SENSOR_DATA_MQTT_BROKER_PORT', 1883))
        mqtt_client = mqtt.Client()
        mqtt_client.connect(broker_address, broker_port, 60)
        mqtt_client.loop_start()
        print(f"MQTT client initialized and connected to {broker_address}:{broker_port}")

def store(data):
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