'use strict';

global.api = {};
api.fs = require('fs');
api.vm = require('vm');
api.sandboxesFs = require('sandboxed-fs');

const { cloneInterface, wrapFunction } = require('./wrapper');

const log = (s) => {
    console.log('Print somehting from sandbox');
    console.log(s);
};
const safeRequire = (name) => {
    if (name === 'fs') {
        const msg = 'You dont have access to fs API';
        console.log(msg);
        return new Error(msg);
    } else {
        return require(name);
    }
};

const runSandboxed = (path) => {
    const fileName = path + 'main.js';
    const context = {
        module: {},
        require: safeRequire,
        api: {
            console: { log },
            timers: {
                setTimeout: wrapFunction('setTimeout', setTimeout),
            },
            fs: cloneInterface(api.sandboxesFs.bind(path)),
        },
    };
    context.global = context;

    const sandbox = api.vm.createContext(context);

    api.fs.readFile(fileName, (_, src) => {
        const script = new api.vm.Script(src, fileName);
        const f = script.runInNewContext(sandbox);

        if (f) {
            f();
        }
    });
};

runSandboxed('./applications/application1/');
runSandboxed('./applications/application2/');
