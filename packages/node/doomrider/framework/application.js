const path = require('path');
const watch = require('./watch.js');

const apiPath = path.join(process.cwd(), 'api');

const watcher = new watch.DirectoryWatcher();

console.log(apiPath);

watcher.on('change', (filePath) => {
    console.log(filePath);
});

watcher.watch(apiPath);
