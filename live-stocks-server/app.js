const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const app = express();

var mock_lib = require("./mock-data.js");

app.use(function (req, res) {
  res.send("Hey there, you're trying to access a Secret Server");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({data: data}));
    }
  });

  mock_lib.scheduleUpdate(broadcast);
}

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send(JSON.stringify({message : 'Connection Successfull. You will now recieve Stock Updates every 10 seconds.', type : 'success'}));
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});

mock_lib.scheduleUpdate(broadcast);