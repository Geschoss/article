'use strict';

const fs = require('fs');

const watch = (watchPaths, cb) => {
  watchPaths.forEach((filepath) => {
    fs.watch(filepath, () => {
      cb();
    });
  });
};

module.exports = {
  watch,
};
