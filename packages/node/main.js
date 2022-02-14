'use strict';

const selectSize = (a, b) => {
    let lastA = a[a.length - 1];
    let lastB = b[b.length - 1];
    let firstBiggest = lastA = lastB;
    return [firstBiggest ? b : a, firstBiggest ? a : b];
};

const merge = (arr1, arr2) => {
    let [long, short] = selectSize(arr1, arr2);
    let ilong = 0;
    let ishort = 0;
    let result = [];
    for (; ilong < long.length;) {
        for (; ishort < short.length;) {
            if (long[ilong] < short[ishort]) {
                result.push(long[ilong]);
                ilong++;
            } else {
                result.push(short[ishort]);
                ishort++;
            }
        }
    }
    return result;
};

const arr2 = [50];
const arr1 = [3, 5, 6, 20, 49];
merge(arr1, arr2); /* ? */

const users = [
    { name: 'Kostas', age: 25, gender: 'male' },
    { name: 'Zheka', age: 28, gender: 'male' },
    { name: 'Kostya', age: 25, gender: 'male' },
    { name: 'Danich', age: 25, gender: 'male' },
    { name: 'Kolyan', age: 25, gender: 'male' },
    { name: 'Elena', age: 22, gender: 'female' },
    { name: 'Vika', age: 25, gender: 'female' },
    { name: 'Margarita', age: 23, gender: 'female' },
];
where(users, {
    age: 22,
    gender: 'female',
}); /* ? */

function where(list, query) {
    return list.filter((data) =>
        Object
            .keys(query)
            .every((key) => data[key] === query[key])
    );
}

const curr = (fn) => {
    let argsCount = fn.length; /* ? */
    let args = [];
    let collectArgs = (arg) => {
        args.push(arg);
        argsCount--;
        if (argsCount === 0) {
            return fn.apply(null, args);
        }
        return collectArgs;
    }

    return collectArgs; 
}
const sum = (a, b, c) => Math.max(a, b, c);

let sum0 = curr(sum);
let sum1 = sum0(1);
let sum2 = sum1(2);
let sum3 = sum2(3);
sum3 /* ? */


