'use strict';

const fs = require('fs');

fs.watch('./6-watch.js', (event, file) => {
    console.log({ event, file });
})