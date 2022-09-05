'use strict';

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const PARSING_TIMEOUT = 1000;
const EXECUTION_TIMEOUT = 5000;
const COMMON_CONTEXT = {
  Buffer,
  URL,
  URLSearchParams,
  TextDecoder,
  TextEncoder,
  console,
  queueMicrotask,
  setTimeout,
  setImmediate,
  setInterval,
  clearTimeout,
  clearImmediate,
  clearInterval,
};

const virtualMashineSDK = ({ test }) => ({
  run: async (file) => {
    const { filepath } = file.paths;
    const tests = [];
    const watchPaths = [filepath];

    let sandbox = {
      module: {},
      test: test(file),
      ...COMMON_CONTEXT,
    };
    file.tests = tests;
    file.watchPaths = watchPaths;

    return executeFile(sandbox, filepath, watchPaths);
  },
});

function requireApi(dirname, watchPaths, sandbox) {
  return (name) => {
    const npm = !name.includes('.');
    if (npm) {
      return require(name);
    }
    const importPath = path.join(dirname, name);

    watchPaths.push(importPath);
    require.cache = {};

    return executeFile(sandbox, importPath, watchPaths);
  };
}

function executeFile(sandbox, filepath, watchPaths) {
  const dirname = path.dirname(filepath);

  sandbox.require = requireApi(dirname, watchPaths, sandbox);
  sandbox.global = sandbox;

  const context = vm.createContext(sandbox);

  const src = fs.readFileSync(filepath, 'utf8');

  let srcFn = `() => { ${src} }`;
  let script;

  try {
    script = new vm.Script(srcFn, { timeout: PARSING_TIMEOUT });
  } catch (e) {
    console.dir(e);
    throw new Error('vm.Script error');
  }

  try {
    const f = script.runInNewContext(context, {
      timeout: EXECUTION_TIMEOUT,
    });
    f();
    const module = sandbox.module;

    if (module !== undefined) {
      return module.exports;
    }
  } catch (e) {
    console.dir(e);
    throw new Error('script.runInNewContext error');
  }
}

module.exports = {
  vmSDK: virtualMashineSDK,
};
