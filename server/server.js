const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); // Use any port you like
console.log("Proximity WS Started")
const connectedClients = new Set();

wss.on('connection', (ws) => {
  console.log('Client connected.');
  connectedClients.add(ws);

  ws.on('message', (message) => {
      //console.log(message)
      broadcast(message);
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
    connectedClients.delete(ws);
  });
});

function broadcast(message) {
    for (const client of connectedClients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }


