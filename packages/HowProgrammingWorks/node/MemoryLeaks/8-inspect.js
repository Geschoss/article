'use strict';

let k = 0;

const collection = {};

setInterval(() => {
  k++;
  const key = 'globalVariable' + k;
  collection[key] = new Array(1000).fill(key);
}, 5);

//http://127.0.0.1:9229/json