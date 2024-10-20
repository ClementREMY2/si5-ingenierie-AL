require('dotenv').config();

const express = require("express");
const devicesController = require('./controllers/devicesController');
const gatewaysController = require('./controllers/gatewaysController');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Devices
app.get('/devices', devicesController.getDevices);

// Gateways
app.put('/devices/gateways/:gatewayId/realtime', gatewaysController.putRealtime);

app.listen(port, () => {
  console.log(`Devices service listening on port ${port}`);
});