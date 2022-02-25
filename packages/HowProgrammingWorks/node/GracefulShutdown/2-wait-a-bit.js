'use strict';

const http = require('http');
const connections = new Map();

const SERVER_PORT = 8000;
const LONG_RESPONSE = 60000;
const SHUTDOWN_TIMEOUT = 5000;

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

const closeConnections = () => {
  for (const [connection, res] of connections.entries()) {
    connections.delete(connection);
    res.end('Server stopped');
    connection.destroy();
  }
}

const freeResources = callback => {
  console.log('Free resources');
  callback();
}

const gracefulShutdown = callback => {
  server.close(error => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  });
  setTimeout(() => {
    freeResources(() => {
      closeConnections();
      callback();
    });
  }, SHUTDOWN_TIMEOUT)
}

process.on('SIGINT', () => {
  console.log();
  console.log('Graceful shutdown');
  showConnections();
  gracefulShutdown(() => {
    showConnections();
    console.log('Bye');
    process.exit(0);
  })
})