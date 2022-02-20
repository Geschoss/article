'use strict';

const threads = require('worker_threads');

console.dir({ worker: threads });
threads.parentPort.postMessage('Mesage from Worker to Master');
threads.parentPort.postMessage('message', (data) => {
  console.dir({ data });
})
