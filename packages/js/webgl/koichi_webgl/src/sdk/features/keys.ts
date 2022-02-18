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
        console.log(keyCode);

        let cb = config[keyCode];

        if (cb) {
            cb();
        }
    };
    return that;
};

const sdk = createSdk();

const KEYS_CODE = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
};

type KEYS = typeof KEYS_CODE;

export const keydown = (fn: (keys: KEYS) => Record<number, () => void>) => {
    sdk.addConf(fn(KEYS_CODE));
};
