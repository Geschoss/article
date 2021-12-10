export const log = (...args) => {
    console.log(...args);
};

export const warn = (...args) => {
    console.error(...args);
};

export const initElements = () => ({
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
    input_tx: document.getElementById('input_tx') as HTMLInputElement,
    button_up: document.getElementById('button_up') as HTMLButtonElement,
    button_down: document.getElementById('button_down') as HTMLButtonElement,
});

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
