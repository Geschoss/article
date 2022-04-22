'use strict';

const fs = require('fs');

const fileName = 'result.txt';

fs.watch(fileName, () => {
    const buffer = fs.readFile(fileName, (err, buffer) => {
        const src = buffer.toString();
        console.log(src.split('\n'));
    });
});
