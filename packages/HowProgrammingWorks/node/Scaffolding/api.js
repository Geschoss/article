'use strict';

const loader = require('./loader.js');

const methods = new Map();
const api = loader(methods);

module.exports = api;