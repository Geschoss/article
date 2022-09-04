'use strict';

const fs = require('fs/promises');
const vm = require('vm');
const path = require('path');

const PARSING_TIMEOUT = 1000;
const EXECUTION_TIMEOUT = 5000;

const virtualMashineSDK = ({ test }) => ({
  run: async (file) => {
    const { dirname, filepath, filename } = file.paths;
    file.tests = [];
    
    const sandbox = {
      module: {},
      console,
      require: (name) => {
        const npm = !name.includes('.');
        if (npm) {
          return require(name);
        }
        return require(path.join(dirname, name));
      },
      // testik api
      test: test(file),
    };

    sandbox.global = sandbox;
    const context = vm.createContext(sandbox);

    const src = await fs.readFile(filepath, 'utf8');

    let srcFn = `() => { ${src} }`;
    let script;

    try {
      script = new vm.Script(srcFn, { timeout: PARSING_TIMEOUT });
    } catch (e) {
      console.dir(e);
      return false;
    }

    try {
      const f = script.runInNewContext(context, {
        timeout: EXECUTION_TIMEOUT,
      });
      f();
      return true;
    } catch (e) {
      console.dir(e);
      return false;
    }
  },
});

module.exports = {
  vmSDK: virtualMashineSDK,
};
