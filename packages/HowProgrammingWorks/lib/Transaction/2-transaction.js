'use strict';

const log = (...args) => console.log(...args);

function Transaction() {}

Transaction.start = (data) => {
    log('\nstart transaction');
    let delta = {};

    const methods = {
        commit: () => {
            log('\ncommit transaction');
            Object.assign(data, delta);
            delta = {};
        },
        rollback: () => {
            log('\nrollback transaction');
            delta = {};
        },
    };

    return new Proxy(data, {
        get(target, key) {
            log('get', key);
            if (methods.hasOwnProperty(key)) return methods[key];
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

const data = { name: 'Marcus Aurelius', born: 121 };

const transaction = Transaction.start(data);
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));

transaction.name = 'Mao Zedong';
transaction.born = 1893;
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));

transaction.commit();
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));

transaction.born = 1976;
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));

transaction.rollback();
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));
