const createSdk = () => {
  let config = {};
  let logkeys = false;

  let that = {
    addConf(conf, _logkeys) {
      config = {
        ...config,
        ...conf,
      };
      logkeys = _logkeys
    },
  };

  document.onkeydown = function (ev) {
    let { key } = ev;
    if (logkeys) {
      console.log('onkeydown:', key);
    }

    let cb = config[key];

    if (cb) {
      cb();
    }
    let afterAll = config.afterAll;
    if (config.afterAll) {
      afterAll();
    }
  };
  return that;
};

const sdk = createSdk();

export const keydown = (callback, logkeys = false) => {
  sdk.addConf(callback(), logkeys);
};
