import { getWebGLContext, initShaders } from './lib/cuon-utils';
import { point } from './shaders';
import './style.css';

const main = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const gl = getWebGLContext(canvas);

    initShaders(gl, point.vertex, point.fragmetn);

    gl.clearColor(0.0, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
};

document.addEventListener('DOMContentLoaded', main);
