const { findFiles } = require('./fs');
const { watch } = require('./watch');
const { vmSDK } = require('./vm');
const testikApi = require('./testik.js');

class ControllerSDK {
  constructor(logger) {
    this.vm = vmSDK(testikApi);
    this.files = {};
    this.logger = logger;
    this.errors = {};
    this.success = true;
  }

  run({ filePattern, projectPath }) {
    findFiles(projectPath, filePattern).then((files) => {
      this.files = files.reduce(
        (acc, file) => ({
          ...acc,
          [file.filepath]: {
            paths: file,
            tests: [],
          },
        }),
        {}
      );
      this.findTest();
    });
  }

  findTest() {
    Promise.all(
      map((file) => {
        return this.vm.run(file);
      }, this.files)
    ).then(() => {
      forIn((file) => {
        this.runTest(file);
        this.findErrors(file);
        this.watch(file);
      }, this.files);
      this.printErrors();
    });
  }

  watch(file) {
    watch(
      file.watchPaths,
      debounce(() => {
        this.vm.run(file).then(() => {
          this.runTest(file);
          this.findErrors(file);
          this.printErrors();
        });
      }, 400)
    );
  }

  runTest({ paths, tests }) {
    tests.forEach((test) => {
      try {
        test.cb(
          testikApi.expect((result) => {
            test.result = result;
          })
        );
      } catch (e) {}
    });
  }

  findErrors({ paths, tests }) {
    try {
      let errors = tests.filter(({ result }) => result.status === 'Error');
      if (errors.length === 0) {
        delete this.errors[paths.filepath];
        this.success = true;
        return;
      }

      this.errors[paths.filepath] = errors;
      this.success = true;
    } catch (e) {
      this.success = false;
    }
  }

  printErrors() {
    if (!this.success) {
      return;
    }
    console.clear();
    let fileErrors = map(
      (errors, filepath) => ({
        filepath,
        errors,
      }),
      this.errors
    );

    if (fileErrors.length === 0) {
      this.logger.success();
      return;
    }
    fileErrors.forEach(({ filepath, errors }) => {
      this.logger.start(filepath);
      errors.forEach((error) => {
        this.logger.error(error);
      });
    });
  }
}

function forIn(cb, obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      cb(value, key);
    }
  }
}

function map(cb, obj) {
  let result = [];
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result.push(cb(value, key));
    }
  }
  return result;
}

function debounce(cb, time) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, time);
  };
}

module.exports = {
  ControllerSDK,
};
