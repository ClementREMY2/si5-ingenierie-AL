require('dotenv').config();

const express = require("express");
const usersController = require('./controllers/usersController');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', usersController.getUsers);

app.listen(port, () => {
  console.log(`Users service listening on port ${port}`);
});