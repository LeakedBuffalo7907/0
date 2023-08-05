var express = require('express')
var expressWs = require('express-ws')

console.log("Starting")
var app = express()
expressWs(app)
const connectedClients = new Set();

app.get('/', (res, req) => {
  req.send("ok")
})

app.ws('/', (ws, req) => {
  console.log('Client connected.');
  connectedClients.add(ws);
  ws.on('message', function (message) {
    broadcast(message);
  })
  ws.on('close', function () {
    connectedClients.delete(ws);
  })
})

function broadcast(message) {
    for (const client of connectedClients) {
        client.send(message);
    }
  }

app.use(express.static('public'))
app.listen(8080, function () {
    console.log('Proximity Server running at 8080!')
})