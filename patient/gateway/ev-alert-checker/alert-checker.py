import paho.mqtt.client as mqtt
import json
import os
import time
import sys

# Data accumulator, to store the last 5 heart rate values
heart_rate_data = []

# MQTT broker address and port (from environment variables MQTT_BROKER_ADDRESS and MQTT_BROKER_PORT)
mqtt_broker_address = os.getenv('MQTT_BROKER_ADDRESS', 'localhost')
mqtt_broker_port = int(os.getenv('MQTT_BROKER_PORT', 1883))

print(f"Connecting to MQTT broker at {mqtt_broker_address}:{mqtt_broker_port}")
sys.stdout.flush()

# Callback when the client is connected to the broker
def on_connect(client, userdata, flags, rc):
    print("Connected with result code  "+str(rc))
    sys.stdout.flush()
    if rc == 0:
        client.subscribe("filtered-data")
        print("Subscribed to filtered-data topic")
        sys.stdout.flush()
    else:
        print(f"Failed to connect, return code {rc}")
        sys.stdout.flush()

# Callback when a message is received from the broker
def on_message(client, userdata, msg):
    print("Received message: "+str(msg.payload))
    sys.stdout.flush()
    data = json.loads(msg.payload)
    if data["type"] == "heart_rate":
        # Log
        print(f"Received heart rate data: {data['value']} bpm")
        sys.stdout.flush()

        # If the heart rate if superior to 100 bpm, send an alert
        if len(heart_rate_data) > 5:
            average = sum(heart_rate_data) / len(heart_rate_data)
            filtered_data = {
                "type": "heart_rate",
                "value": average
            }
        client.publish("filtered-data", json.dumps(filtered_data))
        print(f"Published filtered heart rate data: {average} bpm")
        sys.stdout.flush()

# Callback when the client disconnects from the broker
def on_disconnect(client, userdata, rc):
    print("Disconnected with result code "+str(rc))
    sys.stdout.flush()
    if rc != 0:
        print("Unexpected disconnection. Attempting to reconnect...")
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
client.on_message = on_message
client.on_disconnect = on_disconnect

# Attempt to connect to the broker with retry logic
reconnect()

client.loop_forever()
