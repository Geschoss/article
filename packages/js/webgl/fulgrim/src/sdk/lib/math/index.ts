export const random = (min: number, max: number) =>
    (Math.random() / 1) * (max - min) + min;

export const range = (from: number, to: number) => {
    let result = [];
    let n = from;
    while (n < to) {
        result.push(n);
        n += 1;
    }
    return result;
};

export const map = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
) => ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
