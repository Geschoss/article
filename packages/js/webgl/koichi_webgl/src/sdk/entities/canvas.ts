import { store } from '../features/state';
import { createProgram, getWebGLContext } from '../lib/webgl';

export const canvas = (width: number, height: number) => {
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
    const program = createProgram(gl);

    store.init({ canvas, gl, program });
};
