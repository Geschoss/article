const createSdk = () => {
    let subs = [];
    let that = {
        add(sub) {
            subs.push(sub);
        },
    };

    document.onkeydown = function (ev) {
        subs.forEach((cb) => {
            cb(ev.keyCode);
        });
    };
    return that;
};

const sdk = createSdk();

export const keydown = (cb) => {
    sdk.add(cb);
};
