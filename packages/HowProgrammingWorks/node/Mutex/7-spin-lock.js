'use strict';

const threads = require('worker_threads');
const { Worker, isMainThread } = threads;

const LOCKED = 0;
const UNLOCKED = 1;

class Mutex {
  constructor(shared, offset = 0, initial = false) {
    this.lock = new Int32Array(shared, offset, 1);
    if (initial) Atomics.store(this.lock, 0, UNLOCKED);
    this.owner = false;
  }

  enter() {
    return new Promise(resolve => {
      const tryEnter = () => {
        const prev = Atomics.exchange(this.lock, 0, LOCKED);
        if (prev === UNLOCKED) {
          this.owner = true;
          resolve();
        } else {
          setTimeout(tryEnter, 0);
        }
      };
      tryEnter();
    });
  }

  leave() {
    if (!this.owner) return;
    Atomics.store(this.lock, 0, UNLOCKED);
    Atomics.notify(this.lock, 0, 1);
    this.owner = false;
  }
}

// Usage

if (isMainThread) {
  const buffer = new SharedArrayBuffer(4);
  const mutex = new Mutex(buffer, 0, true);
  console.dir({ mutex });
  new Worker(__filename, { workerData: buffer });
  new Worker(__filename, { workerData: buffer });
} else {
  const { threadId, workerData } = threads;
  const mutex = new Mutex(workerData);

  setInterval(() => {
    console.log(`Interval ${threadId}`);
  }, 500);

  const loop = async () => {
    await mutex.enter();
    console.log(`Enter ${threadId}`);
    setTimeout(() => {
      mutex.leave();
      console.log(`Leave ${threadId}`);
      setTimeout(loop, 0);
    }, 5000);
  };
  loop();
}