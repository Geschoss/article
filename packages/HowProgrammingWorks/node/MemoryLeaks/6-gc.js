'use strict';

const memory = [];

const bytesToMb = (bytes) => Math.round(bytes / 1000, 2) / 1000;
let collection = {};
let k = 0;

const timer = setInterval(() => {
  k++;
  const key = 'globalVariable' + k;
  collection[key] = new Array(1000).fill(key);
}, 5);


setInterval(() => {
  console.clear();
  const usage = process.memoryUsage();
  const row = {
    rss: bytesToMb(usage.rss),
    heapTotal: bytesToMb(usage.heapTotal),
    heapUsed: bytesToMb(usage.heapUsed),
    external: bytesToMb(usage.external),
    stack: bytesToMb(usage.rss - usage.heapTotal),
  };
  memory.push(row);
  console.table(memory);
}, 1000);

setTimeout(() => {
  clearInterval(timer);
  if (global.gc) {
    collection = {};
    // gc();
  }
}, 10000);

setTimeout(() => {
  process.exit(0);
}, 50000);