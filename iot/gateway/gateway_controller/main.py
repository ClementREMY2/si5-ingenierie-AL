import paho.mqtt.client as mqtt
import json
import os
import sys
import threading
import sqlite3

MQTT_BROKER_ADDRESS = os.getenv('GATEWAY_CONTROL_MQTT_BROKER_ADDRESS', '')
MQTT_BROKER_PORT = int(os.getenv('GATEWAY_CONTROL_MQTT_BROKER_PORT', ''))

PATIENT_ID = os.getenv('PATIENT_ID', '')
GATEWAY_ID = os.getenv('GATEWAY_ID', '')

# IMPORTANT: At timezone UTC
def get_current_time_iso(time):
    formatted_time = time.strftime("%Y-%m-%dT%H:%M:%SZ")
    return formatted_time



def get_sqlite_connection():
    return sqlite3.connect('gateway.db')
    
def init_sqlite_connection():
    con = get_sqlite_connection()

    # Check if the table exists
    cursor = con.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='settings'")

    table_exists = cursor.fetchone()
    if table_exists is None:
        # Create the table realtime with one column enabled (boolean)
        cursor.execute("CREATE TABLE settings (realtime_enabled BOOLEAN)")
        # Insert the default value (disabled)
        cursor.execute("INSERT INTO settings (realtime_enabled) VALUES (0)")
        con.commit()

        print("[SQLITE] Table settings created with default values")
        sys.stdout.flush()
    
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

realtime_topic = "gateway/" + GATEWAY_ID + "/realtime"

def init_gateway_subscription():
    mqtt_client = get_mqtt_client()
    mqtt_client.subscribe(realtime_topic)
    mqtt_client.on_message = on_message

def on_message(client, userdata, message):
    # Transform the message payload to JSON
    payload = json.loads(message.payload)

    # print(f"Message received: {client}")
    # print(f"Message received 2: {userdata}")
    # print(f"Message received 3: {message.topic}")
    # print(f"Message received: {payload}")
    # sys.stdout.flush()

    if (message.topic == realtime_topic):
        update_realtime(payload)

def update_realtime(data):
    con = get_sqlite_connection()
    cursor = con.cursor()

    new_realtime = '1' if data['state'] == 'enabled' else '0'

    # Update the value of the realtime table
    cursor.execute("UPDATE settings SET realtime_enabled = ?", (new_realtime))
    con.commit()

    print(f"[SQLITE] Realtime updated ({'enabled' if new_realtime == '1' else 'disabled'})")
    sys.stdout.flush()

if __name__ == '__main__':
    init_sqlite_connection()
    init_gateway_subscription()
    while True:
        pass