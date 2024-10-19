require('dotenv').config();

const express = require("express");
const healthchecksController = require('./controllers/healthchecksController');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/healthchecks', healthchecksController.getHealthchecks);

app.listen(port, () => {
  console.log(`Healthchecks service listening on port ${port}`);
});