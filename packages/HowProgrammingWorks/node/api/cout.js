const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

r1.question('What do you think of Node.js?\n', answer => {

    console.log(answer);

    r1.close();
})