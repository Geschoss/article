import './style.css';
import { getWebGLContext, initShaders } from './lib/cuon-utils';
import { Matrix4 } from './lib/cuon-matrix';
import { point } from './shaders';
import { initElements } from './lib/std';

let Tx = 0.5;
let ANGLE_STEP = 40.0;

const main = () => {
    const { canvas, button_down, button_up, input_tx } = initElements();

    const gl = getWebGLContext(canvas);
    const program = initShaders(gl, point.vertex, point.fragmetn);
    const n = initVertexBuffers(gl, program);

    gl.clearColor(0.1, 0.1, 0.1, 0.2);

    let currentAngle = 0.0;

    let tick = function () {
        currentAngle = animate(currentAngle);
        draw(gl, program, n, currentAngle);
        requestAnimationFrame(tick);
    };

    tick();

    button_up.addEventListener('click', () => {
        ANGLE_STEP = ANGLE_STEP + 10;
    });

    button_down.addEventListener('click', () => {
        ANGLE_STEP = ANGLE_STEP - 10;
    });

    input_tx.addEventListener('input', (event) => {
        Tx = event.target.value / 10;
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

function draw(
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

let g_last = Date.now();
function animate(angle: number) {
    let now = Date.now();

    let elapsed = now - g_last;
    g_last = now;

    return (angle + (ANGLE_STEP * elapsed) / 1000.0) % 360;
}

document.addEventListener('DOMContentLoaded', main);
