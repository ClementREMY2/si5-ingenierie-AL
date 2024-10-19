const mqtt = require("mqtt");

const mqttBrokerAddress = process.env.GATEWAY_CONTROL_MQTT_BROKER_ADDRESS;
const mqttBrokerPort = process.env.GATEWAY_CONTROL_MQTT_BROKER_PORT;
const mqttBrokerFullAddress = `mqtt://${mqttBrokerAddress}:${mqttBrokerPort}`;

const client = mqtt.connect(mqttBrokerFullAddress);

client.on("connect", () => {
//   client.subscribe("presence", (err) => {
//     if (!err) {
//       client.publish("presence", "Hello mqtt");
//     }
//   });
    console.log(`[GATEWAY CONTROLLER] Connected to MQTT broker at address ${mqttBrokerFullAddress}`);
});

// client.on("message", (topic, message) => {
//   // message is Buffer
//   console.log(message.toString());
//   client.end();
// });

exports.sendMessage = (topic, message) => {
    const messageString = JSON.stringify(message);
    client.publish(topic, messageString);
};