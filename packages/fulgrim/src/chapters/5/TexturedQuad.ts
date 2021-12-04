import { initShaders } from '../../sdk/lib/cuon-utils';
import { Matrix4 } from '../../sdk/lib/cuon-matrix';
import { vertex, fragmetn } from './shaders';
import { background, createCanvas, setup, draw } from '../../sdk';

import skyUrl from './resources/mascorpone.jpeg';

export const TexturedQuad = () => {
    let program;
    let n;
    setup((state) => {
        createCanvas(800, 600);
        background(255);

        program = initShaders(state.gl, vertex, fragmetn);
        n = initVertexBuffers(state.gl, program);

        initTexture(state.gl, program, n);
    });

    const ANGLE_STEP = 40.0;
    let currentAngle = 0.0;
    draw((state, time) => {
        currentAngle = (currentAngle + (ANGLE_STEP * time) / 1000.0) % 360;
        rotate(state.gl, program, n, currentAngle);
    });
};

function initVertexBuffers(gl: WebGLRenderingContext, program: WebGLProgram) {
    const verticesTexCoords = new Float32Array([
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 0.0,
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

function initTexture(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    n: number
) {
    let texture = gl.createTexture();
    let u_Sampler = gl.getUniformLocation(program, 'u_Sampler');

    let image = new Image();
    image.onload = function () {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGB,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            image
        );
        gl.uniform1i(u_Sampler, 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    };

    image.src = skyUrl;
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
    // modelMatrix.translate(Tx, 0, 0);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
