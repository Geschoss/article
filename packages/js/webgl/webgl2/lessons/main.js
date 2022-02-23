// import { run } from './fundamentals';
// import { run } from './fun';

import { run_2 } from './2d_translation';

const canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 400;
const gl = canvas.getContext('webgl2');

run_2(gl);