require('dotenv').config();

const express = require("express")
const app = express()
const port = process.env.PORT | 3000
const notificationsController = require('./controllers/notificationsController')

app.get('/notifications', notificationsController.getNotifications);

app.get('/notifications', (req, res) => {
  res.send('notifications')
})

app.listen(port, () => {
  console.log(`Notifications service listening on port ${port}`)
})