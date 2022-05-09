import { texture } from './2d';
import { textures } from './3d';
// import { kinematics } from './examples';
const canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 400;
// const gl = canvas.getContext('2d');
const gl = canvas.getContext('webgl2');

texture(gl, canvas);