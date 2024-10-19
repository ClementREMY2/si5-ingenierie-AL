import sys

# Map for each sensor the min and max normal values
SENSOR_RANGES = {
    'heart-rate': (60, 90),
    'pulse-oximeter': (90, 100),
    'glucose': (70, 100),
    'blood-pressure': (60, 120)
}

def check_alert(data):
    min_value, max_value = SENSOR_RANGES.get(data['type'], (0, 0))
    type = data['type']
    value = data['value']
    if value < min_value:
        return f'Alert: {type} value {value} is too low'
    if value > max_value:
        return f'Alert: {type} value {value} is too high'
    return None

def send_alert(alert):
    print(f"[ALERT] {alert}")
    sys.stdout.flush()
    # Send alert to broker
    pass