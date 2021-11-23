import './style.css';
import { getWebGLContext, initShaders } from './lib/cuon-utils';
import { point } from './shaders';

const ANGLE = 40.0;
const Tx = 0.2, Ty = 0.2, Tz = 0.0;
const S = 1;
const Sx = S, Sy = S, Sz = S;

const main = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const gl = getWebGLContext(canvas);

    const program = initShaders(gl, point.vertex, point.fragmetn);
    
    const n = initVertexBuffers(gl, program);

    
    const radian = (Math.PI * ANGLE) / 180.0;
    const cosB = Math.cos(radian);
    const sinB = Math.sin(radian);

    const xformMatrix = new Float32Array([
        cosB * Sx, sinB, 0.0, Tx,
        -sinB, cosB * Sy, 0.0, Ty,
        0.0, 0.0, 1.0 * Sz, Tz,
        0.0, 0.0, 0.0, 1.0,
    ])

    
    const u_xformMatrix = gl.getUniformLocation(program, 'u_xformMatrix');

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

    gl.clearColor(0.0, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
};

function initVertexBuffers(gl: WebGLRenderingContext, program: WebGLProgram) {
    const atom = 0.125;
    const vertices = new Float32Array(
        [-4, 4, -4, -4, 4, 4, 4, -4].map((v) => v * atom)
    );
    const n = vertices.length / 2;

    const vertexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}

document.addEventListener('DOMContentLoaded', main);