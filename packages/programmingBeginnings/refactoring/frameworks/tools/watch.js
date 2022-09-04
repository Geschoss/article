'use strict';

const fs = require('fs');

const watch = (file, cb) => {
  fs.watch(file.filepath, (e) => {
    cb(e, file);
  });
};

module.exports = {
  watch,
};
