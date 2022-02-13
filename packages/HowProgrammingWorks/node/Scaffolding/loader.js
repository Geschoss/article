'use strict';

const path = require('path');
const fs = require('fs');

const loader = (storage) => {
    const loadMethod = (apiPath, name) => {
        const filePath = apiPath + name;
        const key = path.basename(filePath, '.js');
        try {
            const libPath = require.resolve(filePath);
            delete require.cache[libPath];
        } catch (e) {
            return;
        }
        try {
            const method = require(filePath);
            storage.set(key, method);
        } catch (e) {
            storage.delete(name);
        }
    };

    const api = {};

    api.load = (apiPath) => {
        fs.readdir(apiPath, (err, files) => {
            if (err) return;
            files.forEach((name) => {
                loadMethod(apiPath, name);
            });
        });
        return api;
    };

    api.get = (name) => storage.get(name);

    return api;
}

module.exports = loader;