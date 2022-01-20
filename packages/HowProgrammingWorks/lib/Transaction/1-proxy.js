'use strict';

const log = (...args) => console.log(...args);

const start = (data) => {
    log('\nstart transaction');

    let delta = {};
    const commit = () => {
        log('\ncommit transaction');
        Object.assign(data, delta);
        delta = {};
    };

    return new Proxy(data, {
        get(target, key) {
            if (key === 'commit') return commit;
            if (delta.hasOwnProperty(key)) return delta[key];
            return target[key];
        },
        set(target, key, val) {
            log('set', key, val);
            if (target[key] === val) delete delta[key];
            else delta[key] = val;
            return true;
        },
    });
};

// Usage

const data = { name: 'Pavel', born: 121 };

log('data.name', data.name);
log('data.born', data.born);

const transaction = start(data);

transaction.name = 'Mao Zebong';
transaction.born = 1983;

log('data.name', data.name);
log('data.born', data.born);

log('transaction.name', transaction.name);
log('transaction.born', transaction.born);

transaction.commit();

log('data.name', data.name);
log('data.born', data.born);

log('transaction.name', transaction.name);
log('transaction.born', transaction.born);
