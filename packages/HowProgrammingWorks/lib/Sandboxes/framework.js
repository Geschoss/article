'use strict';
const getFileName = () => {
    const fileNameFromArg = process.argv[2];
    if (!fileNameFromArg.match(/\.js/i)) {
        console.error('Wrong file!');
        process.exit(1);
    }

    return fileNameFromArg;
};

const PARSING_TIMEOUT = 1000;
const EXECUTION_TIMEOUT = 5000;

const fs = require('fs');
const vm = require('vm');
const timers = require('timers');
const events = require('events');

const util = require('./util.js');

const aplicationName = getFileName();

const sandbox = {
    module: {},
    console: new Proxy(console, {
        get: function (obj, prop) {
            if (prop === 'log') {
                return (...args) => {
                    obj.log(`${aplicationName} ${new Date()} `, ...args);
                };
            }
            return obj[prop];
        },
    }),
    require: (name) => {
        console.log(`${new Date()} ${name}`);
        if (name === 'fs') {
            console.log('Module fs is restricted');
            return null;
        }

        return require(name);
    },
};

sandbox.global = sandbox;
const context = vm.createContext(sandbox);

const api = {
    timers,
    events,
};

fs.readFile(aplicationName, 'utf8', (err, src) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    src = `(api, util) => { ${src} }`;
    let script;

    try {
        script = new vm.Script(src, { timeout: PARSING_TIMEOUT });
    } catch (e) {
        console.dir(e);
        process.exit(1);
    }

    try {
        const f = script.runInNewContext(context, {
            timeout: EXECUTION_TIMEOUT,
        });
        f(api, util);
        const exported = context.module.exports;
        console.dir({ exported });
    } catch (e) {
        console.dir(e);
        process.exit(1);
    }
});

process.on('uncaughtException', (err) => {
    console.log('Unhandled exception: ' + err);
});
