import data.filterer as filterer
import data.alert_checker as alert_checker
import data.data_store as data_store

REALTIME_ACTIVATED = True

def process(data):
    # Filter data
    filtered_data = filterer.filter(data)
    if filtered_data is None:
        return

    # Check alert
    alert = alert_checker.check_alert(filtered_data)
    if alert is not None:
        alert_checker.send_alert(alert)

    # If realtime, send to broker, else store in database
    if REALTIME_ACTIVATED:
        # Send to broker
        data_store.store(filtered_data)
        pass
    else:
        # Store in database
        pass