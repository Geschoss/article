'use strict';

const log = (...args) => console.log(...args);

const os = require('os');
const express = require('express');
const cluster = require('cluster');

const app = express();
const hostname = '127.0.0.1';
const port = 8000;

const user = { name: 'jura', age: 22 };

if (cluster.isMaster) {
	const cpus = os.cpus().length;
	log(`CPU count: ${cpus}`);
	for (let i = 0; i < 2; i++) cluster.fork();
} else {
	app.get('/', (req, res) => {
		log(`new connect: ${new Date()}`);
		for (let i = 0; i < 1e5; i++) {};
		res.end('Welcome to homepage');
	});

	app.get('/user', (req, res) => {
		res.end(JSON.stringify(user));
	});

	app.get('/user/name', (req, res) => {
		res.end(user.name);
	});

	app.get('/user/age', (req, res) => {
		res.end(`${user.age}`);
	});

	app.listen(port, hostname, () => {
		log(`New cluster running at http://${hostname}:${port}/`);
	});
};
