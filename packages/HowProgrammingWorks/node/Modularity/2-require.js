'use strict';

const fs = require('fs');
const events = require('node:events');
const timers1 = require('timers/promises');
const timers2 = require('node:timers/promises');
const ws = require('ws');
const exp = reqreui('./1-exports.js');

console.log(Object.keys(fs));
console.log(Object.keys(events));
console.log(Object.keys(timers1));
console.log(Object.keys(timers1));
console.log(Object.keys(ws));
console.log(Object.keys(exp));