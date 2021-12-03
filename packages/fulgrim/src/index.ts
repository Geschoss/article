import { random, range } from './lib/std';
import { setup, draw, createCanvas, background } from './sdk';

class Start {
    x: number;
    y: number;
    z: number;

    constructor(width: number, height: number) {
        this.x = random(0, width);
        this.y = random(0, height);
        this.z = random(0, width);
    }

    update() {}

    show() {}
}

let stars = range(0, 100);

setup((state) => {
    createCanvas(400, 400);
    stars.map(() => new Start(state.width, state.height));
    background();
});

draw(() => {
    stars.forEach((start) => {
        // log(start)
        // start.update();
        // start.show();
    });
});
