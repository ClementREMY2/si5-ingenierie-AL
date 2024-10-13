# Map for each sensor the min and max acceptable values
sensor_ranges = {
    'heart-rate': (60, 100),
    'pulse-oximeter': (90, 100),
    'glucose': (70, 180),
   'blood-pressure': (80, 120)
}

def filter(data):
    # Check if data.type is in sensor_ranges
    if data['type'] not in sensor_ranges:
        return None
    
    # Check if value is in the acceptable range
    min_value, max_value = sensor_ranges[data['type']]
    if data['value'] < min_value or data['value'] > max_value:
        return None
    
    return data