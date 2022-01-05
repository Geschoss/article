'use strict';
const http = require('./http');

const {
    getPerson,
    postPerson,
} = require('./entity/person.js');

const port = 8000;
const routes = [
    {
        url: '/',
        method: 'GET',
        handler: ({ res, req, cookies }) => {
            res.writeHead(200, {
                'Set-Cookie': 'mycookie=test',
                'Content-Type': 'text/html',
            });
            const ip = req.connection.remoteAddress;
            res.end(
                `<h1>Welcome</h1>Your IP: ${ip}<pre>\n${JSON.stringify(
                    cookies
                )}</pre>`
            );
        },
    },
    {
        url: '/person',
        method: 'GET',
        handler: getPerson,
    },
    {
        url: '/person',
        method: 'POST',
        handler: postPerson,
    },
];
const logger = {
    log(...args) {
        console.log(...args);
    },
};
const cacher = {
    cache: new Map(),
    has(key) {
        return cacher.cache.has(key);
    },
    get(key) {
        return cacher.cache.get(key);
    },
    set(key, value) {
        return cacher.cache.set(key, value);
    },
};

http.start({
    port,
    routes,
    logger,
    cacher,
});
