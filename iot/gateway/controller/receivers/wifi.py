from flask import Flask, request
import sys
import os
import data.processor as processor

port = int(os.getenv('RECEIVER_WIFI_PORT', 8080))

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        print(f"Received POST request with data: {data}")
        processor.process(data)
    # Flush the output to ensure the print statements are not buffered
    sys.stdout.flush()
    return "OK"

def init():
    print(f"Initializing WiFi receiver on port {port}")
    sys.stdout.flush()
    app.run(host='0.0.0.0', port=port)