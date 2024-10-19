import processors.filterer as filterer
import processors.alert_checker as alert_checker
import processors.data_store as data_store

REALTIME_ACTIVATED = False

def process(data):
    # Filter data
    filtered_data = filterer.filter(data)
    if filtered_data is None:
        return

    # Check alert
    alert = alert_checker.check_alert(filtered_data)
    if alert is not None:
        alert_checker.send_alert(filtered_data, alert)

    # If realtime, send to broker, else store in database
    if REALTIME_ACTIVATED:
        # Send to broker
        data_store.send_realtime(filtered_data)
        pass
    else:
        # Store in database
        data_store.store(filtered_data)
        pass