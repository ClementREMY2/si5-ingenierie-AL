require('dotenv').config();

const express = require("express");
const authenticationController = require('./controllers/authenticationController');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/auth/login', authenticationController.login);

app.post('/auth/register', authenticationController.register);


app.get('/auth/register', (req, res) => {
  res.send('ok');
});

app.listen(port, () => {
  console.log(`Authentication service listening on port ${port}`);
});