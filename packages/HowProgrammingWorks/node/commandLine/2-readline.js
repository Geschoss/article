'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question('Enter your name: ', name => {
    console.log(`\nHello, ${name}`);
    rl.close();
})