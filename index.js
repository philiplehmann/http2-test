const fs = require('fs')
const https = require('https')
const spdy = require('spdy')
const express = require('express')
const compression = require('compression')

const app = express()

const shouldCompress = (req, res) => {
  // don't compress responses asking explicitly not
  if (req.headers['x-no-compression']) {
    return false
  }

  // use compression filter function
  return compression.filter(req, res)
}

app.use(compression({ filter: shouldCompress }))

app.get('/', (req, res) => {
  res.send('Hello HTTPS!')
})

const port = 443

spdy.createServer({
  key: fs.readFileSync('localhost.key.pem'),
  cert: fs.readFileSync('localhost.cert.pem')
}, app).listen(port, error => {
  if (error) {
    console.error(error)
    return process.exit(1)
  } else {
    console.log(`HTTP/2 server listening on port: ${port}`)
  }
})