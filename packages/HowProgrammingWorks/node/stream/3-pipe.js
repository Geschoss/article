'use strict';

const fs = require('fs');

const rs = fs.createReadStream('3-pipe.js', 'utf8');
const ws = fs.createWriteStream('copy.js', 'utf8');

rs.pipe(ws);

rs.on('end', () => {
    console.log('Done');
})