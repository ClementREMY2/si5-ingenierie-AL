from flask import Flask, request
import sys
import os
import data.processor as processor

PORT = int(os.getenv('RECEIVER_WIFI_PORT', 8080))

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        processor.process(data)
    return "OK"

def init():
    print(f"[WIFI] Initializing WiFi receiver on PORT {PORT}")
    sys.stdout.flush()
    app.run(host='0.0.0.0', port=PORT)