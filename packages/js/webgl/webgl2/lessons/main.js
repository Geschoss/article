// import { matrices } from './2d';
import { textures } from './3d';
import { kinematics } from './examples';
const canvas = document.querySelector('canvas');
canvas.width = 1000;
canvas.height = 1000;
const gl = canvas.getContext('2d');
// const gl = canvas.getContext('webgl2');

kinematics(gl, canvas);