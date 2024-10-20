
import sqlite3
import time
import sys

settings = None

def get_sqlite_connection():
    return sqlite3.connect('/data/gateway.db')

# Function used at initialisation
def init():
    print(f"[SETTINGS] Initializing settings...")
    sys.stdout.flush()

    # Check if the table settings exists
    con = get_sqlite_connection()

    settings_table = None
    while settings_table is None:
        # Check if the table exists
        cursor = con.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='settings'")

        settings_table = cursor.fetchone()
        if settings_table is None:
            print("[SETTINGS] Table settings does not exist, waiting 2 seconds and trying again")
            sys.stdout.flush()
            # Wait 2 seconds and try again
            time.sleep(2)

    # Settings table exists, we can load the settings
    reload()

    print('[SETTINGS] Settings initialized')
    sys.stdout.flush()

def reload():
    con = get_sqlite_connection()

    # Query the settings table
    cursor = con.cursor()
    cursor.execute("SELECT * FROM settings")
    raw_settings = cursor.fetchone()

    # Set the settings
    global settings
    settings = {
        "realtime_enabled": raw_settings[0]
    }

    print(f"[SETTINGS] Settings reloaded: {settings}")
    sys.stdout.flush()
    return settings

def get(parameter = None):
    global settings
    if parameter:
        return settings[parameter]
    return settings