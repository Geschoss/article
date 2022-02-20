'use strict';

const threads = require('worker_threads');

const { buffer } = threads.workerData;
const array = new Int8Array(buffer);

while (true) {
  for (let j = 0; j < 1024; j++) {
    array[j] += 1;
  }
}