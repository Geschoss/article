const positive = (a) => a >= 0;
const multBy2 = (a) => a * 2;
const less10 = (a) => a < 10;

const arr = [-4, 2, 3, 4, 5, 6, -7, 8, 9, 10, 20];

const makeOperations = (operations, value, index, arr) => {
    let newValue = value;
    for (let { type, fn } of operations) {
        if (type === 'filter') {
            if (fn(newValue, index)) {
                continue;
            }
            return undefined;
        }
        if (type === 'map') {
            newValue = fn(newValue, index);
        }
    }

    return newValue;
};

class Transducers {
    private data = [];
    operations = [];
    constructor(arr) {
        this.data = arr;
    }
    addOperation(operation) {
        this.operations.push(operation);
    }
    run() {
        return this.data.reduce((acc, value, index) => {
            let newValue = makeOperations(this.operations, value, index, arr);
            if (newValue == undefined) {
                return acc;
            }
            acc.push(newValue);
            return acc;
        }, []);
    }
}
const filter = (fn) => (tr) => {
    tr.addOperation({ type: 'filter', fn });
    return tr;
};
const map = (fn) => (tr) => {
    tr.addOperation({ type: 'map', fn });
    return tr;
};
const compose = (...args) => {
    let arr = args[args.length - 1];
    for (let i = 0; i < args.length - 1; i++) {
        let fn = args[i];
        arr = fn(arr);
    }
    return arr;
};
const transArray = new Transducers(arr);

const transResult = compose(
    filter(positive),
    map(multBy2),
    filter(less10),
    transArray
);
const result = arr.filter(positive).map(multBy2).filter(less10);
result; /* ? */
transResult.run(); /* ? */
