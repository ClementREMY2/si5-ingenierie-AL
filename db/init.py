from influxdb_client import InfluxDBClient, Point, WriteOptions
from datetime import datetime, timezone
import os

def get_current_time_iso():
    current_time = datetime.now(timezone.utc)
    formatted_time = current_time.strftime("%Y-%m-%dT%H:%M:%SZ")
    return formatted_time

# TODO : Replace token with http query
url = "http://localhost:8086"
token = "SDj-8eznPvy7zI9r6b3muftG5CnYRJvUbAEqAqPmxr9X-Foo6WEIDTIrgKo68J2PpuxyM0wLkhBTAzz3t-NsKg=="
org = os.getenv("DOCKER_INFLUXDB_INIT_BUCKET")
bucket = os.getenv("DOCKER_INFLUXDB_INIT_BUCKET")

client = InfluxDBClient(url=url, token=token, org=org)

write_api = client.write_api(write_options=WriteOptions(batch_size=1))

# Setup all the measurements with empty values

# Glycemia measurement
point1 = (
    Point("glycemia_data")
    .tag("sensor_id", "0")
    .field("value", 0)
    .time(get_current_time_iso())
)
write_api.write(bucket, org, point1)

# Pulse oximeter measurement
point2 = (
    Point("pulse_oximeter_data")
    .tag("sensor_id", "0")
    .field("value", 0)
    .time(get_current_time_iso())
)
write_api.write(bucket, org, point2)

# Heart frequency measurement
point3 = (
    Point("heart_rate_data")
    .tag("sensor_id", "0")
    .field("value", 0)
    .time(get_current_time_iso())
)
write_api.write(bucket, org, point3)

# Blood pressure monitor measurement
point4 = (
    Point("blood_pressure_data")
    .tag("sensor_id", "0")
    .field("value", 0)
    .time(get_current_time_iso())
)
write_api.write(bucket, org, point4)

client.close()

print("Données insérées avec succès dans InfluxDB")
