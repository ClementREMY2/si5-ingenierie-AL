import os
import time
import random
import requests
import sys
from datetime import datetime, timezone

def get_current_time_iso():
    current_time = datetime.now(timezone.utc)
    formatted_time = current_time.strftime("%Y-%m-%dT%H:%M:%SZ")
    return formatted_time

# Lire les variables d'environnement

min_value = float(os.getenv('SENSOR_MIN_VALUE', '60'))
max_value = float(os.getenv('SENSOR_MAX_VALUE', '100'))
frequency_per_minute = int(os.getenv('SENSOR_FREQUENCY_PER_MINUTE', '30'))
std_dev = float(os.getenv('SENSOR_STD_DEV', '5'))
http_endpoint = os.getenv('HTTP_ENDPOINT', 'http://localhost:8080')
sensor_id = os.getenv('SENSOR_ID', '-1')
sensor_type = os.getenv('SENSOR_TYPE', 'undefined')

# Calculer l'intervalle de temps entre les envois en secondes
interval = 60 / frequency_per_minute

# Fonction pour générer une valeur de capteur simulée
def generate_sensor_value():
    mean_value = (min_value + max_value) / 2
    value = random.gauss(mean_value, std_dev)
    return max(min_value, min(max_value, value))

# Boucle principale pour envoyer les données du capteur à l'endpoint HTTP
while True:
    value = generate_sensor_value()
    print('Sending value:', value)
    sys.stdout.flush()
    # Contruct data as JSON object with id, type and value
    data = {'id': sensor_id, 'type': sensor_type, 'value': value, 'timestamp': get_current_time_iso()}
    try:
        response = requests.post(http_endpoint, json=data)
        response.raise_for_status()
        print('Data sent successfully')
    except requests.exceptions.RequestException as e:
        print(f'Error sending data: {e}')
    sys.stdout.flush()
    time.sleep(interval)