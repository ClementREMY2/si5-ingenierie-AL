import paho.mqtt.client as mqtt
import json
import os
import time
import random
import sys

# MQTT broker address and port (from environment variables MQTT_BROKER_ADDRESS and MQTT_BROKER_PORT)
mqtt_broker_address = os.getenv('MQTT_BROKER_ADDRESS', 'localhost')
mqtt_broker_port = int(os.getenv('MQTT_BROKER_PORT', 1883))

print(f"Connecting to MQTT broker at {mqtt_broker_address}:{mqtt_broker_port}")
sys.stdout.flush()

# Callback when the client is connected to the broker
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    sys.stdout.flush()
    if rc != 0:
        print(f"Failed to connect, return code {rc}")
        sys.stdout.flush()

# Callback when the client disconnects from the broker
def on_disconnect(client, userdata, rc):
    print("Disconnected with result code "+str(rc))
    sys.stdout.flush()
    if rc != 0:
        print("Unexpected disconnection. Attempting to reconnect...")
        sys.stdout.flush()
        reconnect()

def reconnect():
    while True:
        try:
            print(f"Reconnecting to {mqtt_broker_address}:{mqtt_broker_port}")
            sys.stdout.flush()
            client.connect(mqtt_broker_address, mqtt_broker_port, 60)
            break
        except ConnectionRefusedError:
            print("Connection refused, retrying in 10 seconds...")
            sys.stdout.flush()
            time.sleep(10)

# Create the client
client = mqtt.Client()
client.on_connect = on_connect
client.on_disconnect = on_disconnect

# Attempt to connect to the broker with retry logic
reconnect()

# Function to simulate heart rate data and publish it to the MQTT broker
def publish_heart_rate():
    while True:
        heart_rate = random.randint(60, 100)  # Simulate heart rate value
        data = {
            "type": "heart_rate",
            "value": heart_rate
        }
        client.publish("raw-data", json.dumps(data))
        print(f"Published heart rate data: {heart_rate} bpm")
        sys.stdout.flush()
        time.sleep(0.5)

# Start the loop in a separate thread
client.loop_start()

# Start publishing heart rate data
try:
    publish_heart_rate()
except KeyboardInterrupt:
    print("Exiting...")
    client.loop_stop()
    client.disconnect()