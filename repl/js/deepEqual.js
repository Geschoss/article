// simple
console.log(deepEqual(null, null)); // true
let a1 = {};
console.log(deepEqual(a1, a1)); // true
let a2 = { a: 2 };
console.log(deepEqual(a2, a2)); // true
let a3 = a2;
console.log(deepEqual(a2, a3)); // true
// simple
// simple one deep
let b1 = {};
let b2 = {};
console.log(deepEqual(b1, b2)); // true
let b3 = { a: 2 };
let b4 = { a: 2 };
console.log(deepEqual(b3, b4)); // true
let b5 = { a: 2, c: '123' };
let b6 = { a: 2, c: '123' };
console.log(deepEqual(b3, b4)); // true
let b7 = { a: 3, c: '123' };
let b8 = { a: 2, c: '123' };
console.log(deepEqual(b7, b8)); // false
let b9 = { a: 2, c: '123' };
let b10 = { a: 2, d: '123' };
console.log(deepEqual(b9, b10)); // false
// simple one deep
// deep object
let d1 = { a: 2, c: '123', d: { a: 2 } };
let d2 = { a: 2, c: '123', d: { a: 2 } };
console.log(deepEqual(d1, d2)); // true
let d3 = { a: 2, c: '123', d: { a: 3 } };
let d4 = { a: 2, c: '123', d: { a: 2 } };
console.log(deepEqual(d3, d4)); // false
let d5 = { a: 2, c: '123', d: { a: { d: 2 }} };
let d6 = { a: 2, c: '123', d: { a: { d: 2 }} };
console.log(deepEqual(d5, d6)); // false
// deep object

function deepEqual(o1, o2) {
    if (o1 === o2) {
        return true;
    }
	
    if (o2 === undefined || o1 === undefined) {
        return false;
    }

	if (!isObject(o1)) {
		return false;
	}

    // simple one deep
    let keys_1 = Object.keys(o1);
    let keys_2 = Object.keys(o2);
    if (keys_1.length !== keys_2.length) {
        return false;
    }
    return keys_1.every(key_1 => {
        let value_1 = o1[key_1];
        let value_2 = o2[key_1];
        return deepEqual(value_1, value_2);
    });
}

function isObject(o) {
	return null !== 0 && typeof o === 'object';
}
