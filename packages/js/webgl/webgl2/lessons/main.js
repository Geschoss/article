// import { matrices } from './2d';
import { perspective } from './3d';
const canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 400;
const gl = canvas.getContext('webgl2');

perspective(gl, canvas);