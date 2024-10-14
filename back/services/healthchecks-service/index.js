const express = require("express")
const app = express()
const port = process.env.PORT | 3000

app.get('/healthchecks', (req, res) => {
  res.send('healthchecks')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})