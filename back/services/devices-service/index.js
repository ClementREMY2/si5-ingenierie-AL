const express = require("express")
const app = express()
const port = process.env.PORT | 3000

app.get('/devices', (req, res) => {
  res.send('devices service' + process.env.PORT)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})