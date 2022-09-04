'use strict';

const fs = require('fs/promises');

const findFiles = async (dirname, pattern) => {
  let files = await fs.readdir(dirname);
  let result = [];
  for (const filename of files) {
    let filepath = `${dirname}/${filename}`;
    let fileStat = await fs.lstat(filepath);
    let dir = fileStat.isDirectory();
    if (dir) {
      let files = await findFiles(filepath, pattern);
      if (files.length !== 0) {
        result.push(...files);
      }
    } else if (filename.endsWith(pattern)) {
      result.push({ dirname, filepath, filename });
    }
  }

  return result;
};

module.exports = {
  findFiles,
};
