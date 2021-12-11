import { vertex, fragmetn } from './shaders';
import { background, canvas, setup, draw, shaders } from '../../sdk';

import skyUrl from './resources/mascorpone.jpeg';
import circleUrl from './resources/circle.gif';
import { Matrix4 } from '../../sdk/lib/matrix';

export const TexturedQuad = () => {
    let n;
    setup((state) => {
        canvas(800, 600);
        background(255);

        shaders(vertex, fragmetn);
        n = initVertexBuffers(state.gl, state.program);

        initTexture(state.gl, state.program, n);
    });

    const ANGLE_STEP = 40.0;
    let currentAngle = 0.0;
    draw((state, time) => {
        currentAngle = (currentAngle + (ANGLE_STEP * time) / 1000.0) % 360;
        rotate(state.gl, state.program, n, currentAngle);
    });
};

function initVertexBuffers(gl: WebGLRenderingContext, program: WebGLProgram) {
    const verticesTexCoords = new Float32Array([
        -0.5, 0.5, 0.1, 1.0, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 1.0, 1.0, 0.5,
        -0.5, 1.0, 0.0,
    ]);
    const n = verticesTexCoords.length / 4;

    const FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    const vertexTexCoordBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    const a_TextCoord = gl.getAttribLocation(program, 'a_TexCoord');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.vertexAttribPointer(
        a_TextCoord,
        2,
        gl.FLOAT,
        false,
        FSIZE * 4,
        FSIZE * 2
    );
    gl.enableVertexAttribArray(a_TextCoord);

    return n;
}

let g_texUnit0 = false;
let g_texUnit1 = false;
function initTexture(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    n: number
) {
    let texture0 = gl.createTexture();
    let texture1 = gl.createTexture();
    let u_sampler0 = gl.getUniformLocation(program, 'u_Sampler0');
    let u_sampler1 = gl.getUniformLocation(program, 'u_Sampler1');

    let image0 = new Image();
    let image1 = new Image();

    image0.onload = function () {
        loadTexture(gl, image0, texture0, u_sampler0, n, 0);
    };
    image1.onload = function () {
        loadTexture(gl, image1, texture1, u_sampler1, n, 1);
    };

    image0.src = skyUrl;
    image1.src = circleUrl;
}
function loadTexture(
    gl: WebGLRenderingContext,
    image: HTMLImageElement,
    texture: WebGLTexture,
    u_sampler: WebGLUniformLocation,
    n: number,
    texUnit: number
) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    if (texUnit) {
        gl.activeTexture(gl.TEXTURE0);
        g_texUnit0 = true;
    } else {
        gl.activeTexture(gl.TEXTURE1);
        g_texUnit1 = true;
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_sampler, texUnit);

    if (g_texUnit0 && g_texUnit1) {
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    }
}

function rotate(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    n: number,
    currentAngle: number
) {
    const modelMatrix = new Matrix4();
    const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');

    modelMatrix.setRotate(currentAngle, 0, 1, 0);
    modelMatrix.scale(1, 1, 1);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
