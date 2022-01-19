const path = require('path');
const fsp = require('fs').promises;
const watch = require('./watch.js');
const http = require('./http.js');
const vm = require('vm');

const root = process.cwd();

const appPath = path.join(root, 'application');
const apiPath = path.join(root, 'api');

const watcher = new watch.DirectoryWatcher();

const logger = {
    log(...args) {
        console.log(...args);
    },
};
const cacher = {
    cache: new Map(),
    has(key) {
        return cacher.cache.has(key);
    },
    get(key) {
        return cacher.cache.get(key);
    },
    set(key, value) {
        return cacher.cache.set(key, value);
    },
};

load(apiPath).then((routes) => {
    http.start({
        port: 8080,
        routes,
        logger,
        cacher,
    });
});

watcher.on('change', (filePath) => {
    console.log(filePath);
});

watcher.watch(apiPath);

async function load(targetPath) {
    const files = await fsp.readdir(targetPath, { withFileTypes: true });

    let api = [];
    for (const file of files) {
        if (file.name.startsWith('.')) continue;

        const filePath = path.join(targetPath, file.name);
        const exp = await change(filePath);
        const name = path.basename(file.name, '.js');
        
        api.push({
            url: `/${name}`,
            method: 'GET',
            handler: exp.method,
        });
    }

    return api;
}

async function change(filePath) {
    if (!filePath.endsWith('js')) return;

    const script = await createSript(filePath);
    if (!script) return;

    return script({});
}

const COMMON_CONTEXT = vm.createContext(
    Object.freeze({
        console,
        setTimeout,
        setImmediate,
        setInterval,
        clearTimeout,
        clearImmediate,
        clearInterval,
    })
);
const USE_STRICT = `'use strict';\n`;

async function createSript(fileName) {
    const code = await fsp.readFile(fileName, 'utf8');
    if (!code) return null;

    const src = 'context => ' + code;
    const options = { context: {} };
    const strict = src.startsWith(USE_STRICT);
    const strictSrc = strict ? src : USE_STRICT + src;
    const lineOffset = strict ? 0 : -1;

    const scriptOptions = { filename: fileName, ...options, lineOffset };

    const script = new vm.Script(strictSrc, scriptOptions);

    return script.runInContext(COMMON_CONTEXT, {
        timeout: 5000,
        displayErrors: false,
    });
}
