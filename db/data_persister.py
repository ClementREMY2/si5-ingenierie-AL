import json
import paho.mqtt.client as mqtt
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from datetime import datetime

# Paramètres MQTT
BROKER = "localhost"
PORT = 1883
TOPIC = "/patient/324/sensor/4392"

# Paramètres InfluxDB
INFLUXDB_URL = "http://localhost:8087"
INFLUXDB_TOKEN = "alm_token_cloud"
INFLUXDB_ORG = "alm-org"
INFLUXDB_BUCKET = "alm-sensors"

influx_client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)
write_api = influx_client.write_api(write_options=SYNCHRONOUS)

def on_connect(client, userdata, flags, rc):
    client.subscribe(TOPIC)
    print(f"Connecté au broker MQTT avec le code de retour {rc}")

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        print(f"Message reçu : {payload}")

        sensor_id = payload["id"]
        sensor_type = payload["type"]
        value = payload["value"]
        timestamp = payload["timestamp"]

        point = Point("sensor_data")\
            .tag("sensor_id", sensor_id)\
            .field("sensor_type", sensor_type)\
            .field("value", value)\
            .time(datetime.fromisoformat(timestamp[:-1]), WritePrecision.S)

        write_api.write(bucket=INFLUXDB_BUCKET, org=INFLUXDB_ORG, record=point)
        print(f"Enregistrement de la donnée : sensor_id={sensor_id}, sensor_type={sensor_type}, value={value}, timestamp={timestamp}")
    
    except Exception as e:
        print(f"Erreur lors du traitement du message : {e}")

client = mqtt.Client()

client.on_connect = on_connect
client.on_message = on_message

client.connect(BROKER, PORT, 60)

client.loop_forever()
