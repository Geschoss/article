'use strict';
const http = require('./http');

const { Person } = require('./entity/person.js');

const port = 8000;
const routes = [
    {
        url: '/person',
        method: 'GET',
        handler: ({ logger }) =>
            Person.get()
                .then((person) => {
                    logger.log(`Geted from db`);
                    logger.log({ person });

                    return { person };
                })
                .catch((e) => {
                    logger.log(`ERROR! ${e.message}`);

                    return {
                        error: 'Не удалось достать пользователя с базы!',
                    };
                }),
    },
    {
        url: '/person',
        method: 'POST',
        handler: ({ req, cacher }) => {
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                let data = Buffer.concat(body).toString();

                const person = JSON.parse(data);

                Person.save(person).then((person) => {
                    const personStr = JSON.stringify(person);

                    cacher.set(req.url, personStr);
                });
            });
        },
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
