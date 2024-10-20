from flask import Flask, request
import sys
import os
import processors.processor as processor
import settings.settings as settings

PORT = int(os.getenv('RECEIVER_WIFI_PORT', 8080))

app = Flask(__name__ + '_wifi')

@app.route('/', methods=['POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        processor.process(data)
    return "OK"

@app.route('/settings/reload', methods=['POST'])
def settings_reload():
    if request.method == 'POST':
        settings.reload()
    return "OK"

def init():
    print(f"[WIFI] Initializing WiFi receiver on PORT {PORT}")
    sys.stdout.flush()
    app.run(host='0.0.0.0', port=PORT)