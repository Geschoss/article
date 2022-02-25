'use strict';

const http = require('http');
const connections = new Map();

const SERVER_PORT = 8000;
const LONG_RESPONSE = 60000;
const SHUTDOWN_TIMEOUT = 1000;
const HTTP_REFRESH = {
  'Content-Type': 'text/html',
  'Refresh': '5',
}

const timeout = msec => new Promise(r => setTimeout(r, msec));

const server = http.createServer((req, res) => {
  console.log('New reauest');
  connections.set(res.socket, res);
  setTimeout(() => {
    res.end('Example output');
  }, LONG_RESPONSE);
});

server.on('connection', socket => {
  console.log('New connection');
  socket.on('close', () => {
    console.log('Close');
    connections.delete(socket);
  });
});

server.listen(SERVER_PORT);

const showConnections = () => {
  console.log(`Connection: ${[...connections.values()].length}`);
  for (const connection of connections.keys()) {
    const { remoteAddress, remotePort } = connection;
    console.log(` ${remoteAddress}:${remotePort}`);
  }
};

const closeConnections = async () => {
  for (const [connection, res] of connections.entries()) {
    connections.delete(connection);
    res.writeHead(503, HTTP_REFRESH);
    res.end('Server stopped');
    connection.destroy();
  }
}

const freeResources = async () => {
  console.log('Free resources');
}

const gracefulShutdown = async () => {
  server.close(error => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  });
  await timeout(SHUTDOWN_TIMEOUT);
  await freeResources()
  await closeConnections();
}

process.on('SIGINT', async () => {
  console.log();
  console.log('Graceful shutdown');
  showConnections();
  await gracefulShutdown();
  showConnections();
  console.log('Bye');
  process.exit(0);
})