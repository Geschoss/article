({
    mathod: async () => {
        return new Promise((res) => {
            console.log('start use api1')
            setTimeout(() => {
                res();
            }, 200);
        });
    },
});
