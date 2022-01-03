'use strict';

const http = require('http');
const types = {
    object: JSON.stringify,
    string: (s) => s,
    number: (n) => n.toString(),
    boolean: (n) => n.toString(),
    undefined: () => 'not found',
};

const serialize = (data) => {
    const type = typeof data;
    const serializer = types[type];
    if (!serializer) {
        console.error('ERROR! Serializer not found.');

        return 'not found';
    }

    return serializer(data);
};

const makeRoutesMap = (routes) =>
    routes.reduce((acc, route) => {
        const { url, method } = route;

        acc[`${method}:${url}`] = route;

        return acc;
    }, {});

const parseCookies = (cookieStr = '') =>
    cookieStr.split(';').reduce((acc, item) => {
        const parts = item.split('=');
        const key = parts[0].trim();
        const value = (parts[1] || '').trim();

        acc[key] = value;

        return acc;
    }, {});

const start = ({ port, routes, logger, cacher }) => {
    const routesMap = makeRoutesMap(routes);

    const server = http.createServer((req, res) => {
        const routeKey = `${req.method}:${req.url}`;

        const route = routesMap[routeKey];
        const cookies = parseCookies(req.headers.cookie);

        if (!route) {
            res.writeHead(404);
            res.end('Path not found');
            return;
        }

        route.handler({ req, res, cookies, cacher, logger });
    });

    server.on('request', (req) => {
        // Logging
        const date = new Date().toISOString();
        logger.log([date, req.method, req.url].join('  '));
    });

    server.listen(port);
};

module.exports = {
    start,
};
