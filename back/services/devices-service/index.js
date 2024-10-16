require('dotenv').config();

const express = require("express");
const devicesController = require('./controllers/devicesController');
const app = express();
const port = process.env.PORT || 3000;

app.get('/devices', devicesController.getDevices);

app.listen(port, () => {
  console.log(`Devices service listening on port ${port}`);
});