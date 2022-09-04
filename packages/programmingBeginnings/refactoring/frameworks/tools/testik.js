const expect = (controller) => (actual) => {
  return {
    toBe: (expected) => {
      if (actual === expected) {
        controller({ status: 'Ok' });
        return;
      }
      controller({
        status: 'Error',
        method: 'toBe',
        actual,
        expected,
      });
    },
  };
};

const test = (file) => (name, cb) => {
  file.tests.push({
    name,
    cb,
  });
};

module.exports = {
  test,
  expect,
};
