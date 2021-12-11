import { random, range, map } from '../sdk/lib/math';
import { setup, draw, canvas, background, shaders, line } from '../sdk';

export const vertex = `#version 300 es
in vec4 a_position;

void main() {
    gl_Position = a_position;
}
`;

const fragmetn = `#version 300 es
precision mediump float;
out vec4 fragColor;

void main() {
    fragColor = vec4(1.0, 0.0, 0.0, 1.0);;
}
`;

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

let stars = range(0, 300);

export const Starfield = () => {
    setup((state) => {
        canvas(800, 800);
        background(255);
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
