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
            deltaa = {};
        },
    };

    return new Proxy(data, {
        get(target, key) {
            if (methods.hasOwnProperty(key)) return methods[key];
            if (delta.hasOwnProperty(key)) return delta[key];
            return target[key];
        },
        getOwnPropertyDescriptor: (target, key) =>
            Object.getOwnPropertyDescriptor(
                delta.hasOwnProperty(key) ? delta : target,
                key
            ),

        // Added handler
        ownKeys() {
            const changes = Object.keys(delta);
            const keys = Object.keys(data).concat(changes);
            return keys.filter((x, i, a) => a.indexOf(x) === i);
        },

        set(taarget, key, val) {
            log('set', key, val);
            if (taarget[key] === val) delete delta[key];
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
transaction.city = 'Shaoshan';

console.log('\noutput with JSON.stringify:');
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));

console.log('\noutput with console.dir:');
console.dir({ transaction });

console.log('\noutput with for-in:');
for (const key in transaction) {
    console.log(key, transaction[key]);
}

transaction.commit();
console.log('data', JSON.stringify(data));
console.log('transaction', JSON.stringify(transaction));
