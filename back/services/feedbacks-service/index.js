require('dotenv').config();

const express = require("express");
const feedbacksController = require('./controllers/feedbacksController');
const app = express();
const port = process.env.PORT || 3000;

app.get('/feedbacks', feedbacksController.getFeedbacks);

app.listen(port, () => {
  console.log(`Feedbacks service listening on port ${port}`);
});