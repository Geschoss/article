'use strict';

const dns = require('dns');

dns.resolve('how.programming.works', (err, data) => {
    if (err) {
        if (err.code === 'ECONNREFUSED') {
            console.log('No internet connetcion');
        } else {
            console.log('Wev is dead');
        }
    }

    console.log({ data });
});

dns.resolveAny('github.com', (err, data) => {
    if (err) throw err;
    console.log({ data });
})