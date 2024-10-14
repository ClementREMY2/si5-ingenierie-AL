const express = require("express")
const app = express()
const port = process.env.PORT | 3000

app.get('/notifications', (req, res) => {
  res.send('notifications')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})