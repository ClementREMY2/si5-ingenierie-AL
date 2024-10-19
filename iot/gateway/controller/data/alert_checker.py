import sys

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
        return None

    min_value, max_value = SENSOR_RANGES.get(data['type'])
    sensor_type = data['type']
    value = data['value']
    if value < min_value:
        return f'Alert: {sensor_type} value {value} is too low'
    if value > max_value:
        return f'Alert: {sensor_type} value {value} is too high'
    return None

def send_alert(alert):
    print(f"[ALERT] {alert}")
    sys.stdout.flush()
    # Send alert to broker
    pass