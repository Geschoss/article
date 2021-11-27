import './style.css';
import { getWebGLContext, initShaders } from './lib/cuon-utils';
import { Matrix4 } from './lib/cuon-matrix';
import { point } from './shaders';

let Tx = 0.5;
let ANGLE_STEP = 40.0;

const main = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const input_tx = document.getElementById('input_tx') as HTMLInputElement;
    const button_up = document.getElementById('button_up') as HTMLButtonElement;
    const button_down = document.getElementById('button_down') as HTMLButtonElement;

    const gl = getWebGLContext(canvas);
    const program = initShaders(gl, point.vertex, point.fragmetn);
    const n = initVertexBuffers(gl, program);

    gl.clearColor(0.1, 0.1, 0.1, 0.2);

    let currentAngle = 0.0;

    const modelMatrix = new Matrix4();
    const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');

    let tick = function () {
        currentAngle = animate(currentAngle);
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick);
    };

    tick();

    button_up.addEventListener('click', () => {
        ANGLE_STEP = ANGLE_STEP + 10;
    })

    button_down.addEventListener('click', () => {
        ANGLE_STEP = ANGLE_STEP - 10;
    })

    input_tx.addEventListener('input', (event) => {
        Tx = event.target.value / 10;
    })
};

function initVertexBuffers(gl: WebGLRenderingContext, program: WebGLProgram) {
    const vertices = new Float32Array([0, 0.3, -0.3, -0.3, 0.3, -0.3]);
    const n = vertices.length / 2;

    const vertexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}

function draw(
    gl: WebGLRenderingContext,
    n: number,
    currentAngle,
    modelMatrix: Matrix4,
    u_ModelMatrix: WebGLUniformLocation
) {
    modelMatrix.setTranslate(Tx, 0, 0);
    modelMatrix.rotate(currentAngle, 1, 1, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

let g_last = Date.now();
function animate(angle: number) {
    let now = Date.now();

    let elapsed = now - g_last;
    g_last = now;

    return (angle + (ANGLE_STEP * elapsed) / 1000.0) % 360;
}

document.addEventListener('DOMContentLoaded', main);
