import './style.css';
import { initShaders } from './lib/cuon-utils';
import { Matrix4 } from './lib/cuon-matrix';
import { point } from './shaders';
import { background, createCanvas, setup, draw } from './sdk';

let Tx = 0.5;
let ANGLE_STEP = 40.0;

const main = () => {
    let program;
    let n;
    setup((state) => {
        createCanvas(800, 600);
        background();

        program = initShaders(state.gl, point.vertex, point.fragmetn);
        n = initVertexBuffers(state.gl, program);
    });

    let currentAngle = 0.0;

    draw((state, time) => {
        currentAngle = (currentAngle + (ANGLE_STEP * time) / 1000.0) % 360;
        drawTriangle(state.gl, program, n, currentAngle);
    });
};

function initVertexBuffers(gl: WebGLRenderingContext, program: WebGLProgram) {
    const verticesSizes = new Float32Array([
        0, 0.5, 10.0, 1.0, 0.0, 0.0, -0.5, -0.5, 20.0, 0.0, 1.0, 0.0, 0.5, -0.5,
        30.0, 0.0, 0.0, 1.0,
    ]);
    const n = 3;
    const a_Position = gl.getAttribLocation(program, 'a_Position');
    const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
    const a_Color = gl.getAttribLocation(program, 'a_Color');

    const vertexSizeBuffer = gl.createBuffer();

    const FSIZE = verticesSizes.BYTES_PER_ELEMENT;

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.vertexAttribPointer(
        a_PointSize,
        1,
        gl.FLOAT,
        false,
        FSIZE * 6,
        FSIZE * 2
    );
    gl.enableVertexAttribArray(a_PointSize);

    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);

    return n;
}

function drawTriangle(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    n: number,
    currentAngle: number
) {
    const modelMatrix = new Matrix4();
    const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');
    const u_Width = gl.getUniformLocation(program, 'u_Width');
    const u_Height = gl.getUniformLocation(program, 'u_Height');

    modelMatrix.setRotate(currentAngle, 1, 1, 0);
    modelMatrix.translate(Tx, 0, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.uniform1f(u_Height, 600);
    gl.uniform1f(u_Width, 600);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

document.addEventListener('DOMContentLoaded', main);
