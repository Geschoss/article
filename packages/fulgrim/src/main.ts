import { getWebGLContext } from './lib/cuon-utils';
import './style.css';

const main = () => {
    const canvas = document.getElementById('canvas');

    const gl = getWebGLContext(canvas);

    gl.clearColor(0.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

document.addEventListener('DOMContentLoaded', main);
