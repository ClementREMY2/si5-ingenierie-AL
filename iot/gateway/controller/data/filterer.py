# Map for each sensor the min and max acceptable values
sensor_ranges = {
    'heart_rate': (60, 100),
    'pulse_oximeter': (90, 100),
    'glycemia': (70, 180),
   'blood_pressure': (80, 120)
}

def filter(data):
    # Check if data.type is in sensor_ranges
    if data['type'] not in sensor_ranges:
        print(f"Data type {data['type']} is not in the acceptable types")
        return None
    
    # Check if value is in the acceptable range
    min_value, max_value = sensor_ranges[data['type']]
    if data['value'] < min_value or data['value'] > max_value:
        return None
    
    return data