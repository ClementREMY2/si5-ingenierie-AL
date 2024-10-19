import paho.mqtt.client as mqtt
import sys
import threading
import os
import json

MQTT_BROKER_ADDRESS = os.getenv('ALERT_MQTT_BROKER_ADDRESS', '')
MQTT_BROKER_PORT = int(os.getenv('ALERT_MQTT_BROKER_PORT', ''))

# Map for each sensor the min and max normal values
SENSOR_RANGES = {
    'heart_rate': (60, 90),
    'pulse_oximeter': (90, 100),
    'glycemia': (70, 100),
    'blood_pressure': (60, 120)
}

def check_alert(data):
    # Check if data.type is in SENSOR_RANGES
    if data['type'] not in SENSOR_RANGES:
        print(f"[ALERT] Data type {data['type']} is not in the acceptable types")
        sys.stdout.flush()
        return None

    min_value, max_value = SENSOR_RANGES.get(data['type'])
    sensor_type = data['type']
    value = data['value']
    if value < min_value:
        return f'Alert: {sensor_type} value {value} is too low'
    if value > max_value:
        return f'Alert: {sensor_type} value {value} is too high'
    return None

connection_lock = threading.Lock()

mqtt_connection = None  # Global variable to store the MQTT client
def get_mqtt_client():
    with connection_lock:
        global mqtt_connection
        if mqtt_connection is None:
            mqtt_connection = mqtt.Client()
            mqtt_connection.connect(MQTT_BROKER_ADDRESS, MQTT_BROKER_PORT, 60)
            mqtt_connection.loop_start()
            print(f"[ALERT - MQTT] Client initialized and connected to {MQTT_BROKER_ADDRESS}:{MQTT_BROKER_PORT}")
            sys.stdout.flush()

        return mqtt_connection

def send_alert(sensor_data, alert_message):
    mqtt_client = get_mqtt_client()

    topic = "alerts"

    # Construct message with sensor data and the alert message
    data = sensor_data.copy()
    data['message'] = alert_message

    message = json.dumps(data)

    # Send the data to the MQTT broker as json
    try:
        mqtt_client.publish(topic, message)
    except Exception as e:
        print(f"[ALERT - MQTT] Error sending data to MQTT broker: {e}")
        # TODO : store alert in local queue if no internet connection
        sys.stdout.flush()
        
        #put_local_queue(data)
        return

    print(f"[ALERT] Alert sent to MQTT broker ({message})")
    sys.stdout.flush()