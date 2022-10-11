const range = function* (start: number, end?: number) {
    let current = end == undefined ? 0 : start;
    let last = end == undefined ? start : end;
    while (true) {
        if (current > last) {
            return current;
        }
        yield current;
        current = current + 1;
    }
};

const cycle = function* <T>(arr: Array<T>) {
    let i = 0;
    let l = arr.length;
    while (true) {
        if (i == l) {
            i = 0;
        }
        yield arr[i];
        i = i + 1;
    }
};

const infinit = function* (start = 0, step = 1) {
    while (true) {
        yield start;
        start = start + step;
    }
};

const take = function* <T = unknown, TReturn = any, TNext = unknown>(
    n: number,
    generator: Generator<T, TReturn, TNext>
) {
    let count = 0;
    while (true) {
        let { value } = generator.next();
        if (count === n) {
            return value;
        }
        yield value;
        count = count + 1;
    }
};

const map = function* <R, T = unknown, TReturn = any, TNext = unknown>(
    fn: (v: T | TReturn) => R,
    generator: Generator<T, TReturn, TNext>
) {
    while (true) {
        let { done, value } = generator.next();
        if (done) {
            return fn(value);
        }
        yield fn(value);
    }
};

const exec = function <T, TReturn, TNext>(
    generator: Generator<T, TReturn, TNext>
) {
    let result: (T | TReturn)[] = [];
    while (true) {
        let { done, value } = generator.next();
        if (done) {
            return result;
        }
        result.push(value);
    }
};

const add2 = (v: number) => v + 2;
const concat = (v: string) => (a: string) => `${v}-${a}`;
const id = <T>(a: T) => a;

let log = console.log;

log(exec(map(add2, take(4, range(10000000000000000000)))));
log(exec(map(concat('1'), take(10, cycle(['A', 'B', 'C'])))));
log(exec(map(id, take(10, cycle(['A', 'B', 'C'])))));
log(exec(map(add2, take(5, infinit(0, 10)))));
log(exec(map(id, take(5, infinit(0, 10)))));
