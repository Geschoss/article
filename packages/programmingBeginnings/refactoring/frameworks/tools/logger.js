const colours = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  bolt: '\x1b[1m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};
function logSdk(console) {
  return (...args) => {
    console.log(`${args.join('')}`, colours.reset);
  };
}

function loggerSdk(console) {
  const log = logSdk(console);
  return {
    start: (name) => {
      log(colours.fg.cyan, colours.bolt, name);
    },
    end: (name) => {
      log(colours.fg.cyan, colours.bolt, `End test: "${name}"`);
    },
    error: ({ name, result }) => {
      const { expect, actual } = result;

      log(colours.fg.red, colours.bolt, `test ${name} failed`);
      // log(colours.fg.green, 'expect');
      // log(colours.fg.green, expect);
      // log(colours.fg.red, 'actual');
      // log(colours.fg.red, actual);
    },
    success: () => {
      log(colours.fg.green, `Test success`);
    },
  };
}

module.exports = {
  loggerSdk,
};
