import { rotation_1 } from './2d';
const canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 400;
const gl = canvas.getContext('webgl2');

rotation_1(gl);