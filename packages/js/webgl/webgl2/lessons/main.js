// import { matrices } from './2d';
import { cameras } from './3d';
import { heads } from './examples';
const canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 400;
const gl = canvas.getContext('webgl2');

heads(gl, canvas);