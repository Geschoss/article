const createSdk = () => {
    let config = {};

    let that = {
        addConf(conf) {
            config = {
                ...config,
                ...conf,
            };
        },
    };

    document.onkeydown = function (ev) {
        let { keyCode } = ev;

        let cb = config[keyCode];

        if (cb) {
            cb();
        }
    };
    return that;
};

const sdk = createSdk();

export const keydown = (conf) => {
    sdk.addConf(conf);
};
