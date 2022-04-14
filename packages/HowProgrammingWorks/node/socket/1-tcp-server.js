'use strict';

const net = require('net');

const server = net.createServer(socket => {
    socket.write('heart');
    console.log(socket.address());
    socket.on('data', data => {
        console.log(`>: ${data}`);
    });
}).listen(2000);

server.on('error', err => {
    console.log('Server error', err);
})