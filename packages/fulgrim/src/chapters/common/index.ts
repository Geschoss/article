import { random, range } from '../../sdk/lib/std';
import {
    setup,
    draw,
    createCanvas,
    background,
    shaders,
    point,
    line,
} from '../../sdk';
import { fragmetn, vertex } from './shaders';

const map = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
) => ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

class Start {
    x: number;
    y: number;
    z: number;
    pz: number;

    constructor(width: number, height: number) {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(0, 1);
        this.pz = this.z;
    }

    leftCanvas(value: number, range: number) {
        return Math.abs(value) > range;
    }
    update(width: number, height: number) {
        this.z = this.z - 0.01;
        if (
            this.leftCanvas(this.x / this.z, width) ||
            this.leftCanvas(this.y / this.z, height)
        ) {
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.z = random(0, 1);
            this.pz = this.z;
        }
    }

    show(width: number, height: number) {
        let sx = map(this.x / this.z, -width, width, -1, 1);
        let sy = map(this.y / this.z, -height, height, -1, 1);

        let px = map(this.x / this.pz, -width, width, -1, 1);
        let py = map(this.y / this.pz, -height, height, -1, 1);
        
        this.pz = this.z;
        
        line(px, py, sx, sy);
    }
}

let stars = range(0, 800);

export const Starfield = () => {
    setup((state) => {
        createCanvas(800, 800);
        background();
        shaders(vertex, fragmetn);

        stars = stars.map(() => new Start(state.width, state.height));
    });

    draw((state) => {
        stars.forEach((star) => {
            star.update(state.width, state.height);
            star.show(state.width, state.height);
        });
    });
};
