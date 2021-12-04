import { getWebGLContext } from './lib/cuon-utils';
import { createState } from './state';

const state = createState();
export const createCanvas = (width: number, height: number) => {
    // + create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.id = 'canvas_id';
    document.body.appendChild(canvas);
    // -

    // + init webGl
    const gl = getWebGLContext(canvas);
    // -
    state.init({ canvas, gl });
};

const toRGB = 2.55 * 100;
export const background = (red = 0, green = red, blue = red, alpha = 1) => {
    const { gl } = state;

    gl.clearColor(red / toRGB, green / toRGB, blue / toRGB, alpha);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

export const setup = (cb: (store: typeof state) => void) => {
    cb(state);
};

export const draw = (cb: (store: typeof state, time: number) => void) => {
    let start = 0;
    const tick = () => {
        requestAnimationFrame((time) => {
            cb(state, Math.floor(time - start));
            start = time;
            tick();
        });
    };
    tick();
};
