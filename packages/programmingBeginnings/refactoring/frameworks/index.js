'use strict';

const { loggerSdk } = require('./tools/logger.js');
const { ControllerSDK } = require('./tools/controller');

const conf = {
  projectPath: process.cwd(),
  filePattern: '.test.js',
};

const logger = loggerSdk(console);
const controller = new ControllerSDK(logger);

controller.run(conf);
