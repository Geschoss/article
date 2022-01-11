'use strict';
const path = require('path');
const fs = require('fs');

const findAllFilesFrom = (folder) => {
    const directoryPath = path.join(__dirname, folder);

    return fs.readdirSync(directoryPath);
};

const lib = findAllFilesFrom('lib').reduce((acc, fileName) => {
    const sub = require(`./lib/${fileName}`);

    return Object.assign(acc, sub);
}, {});

module.exports = lib;
