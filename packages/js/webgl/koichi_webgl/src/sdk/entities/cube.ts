import { store } from '../features';

let colors = [];
let indices = [];
let vertices = [];
let normals = [];

export function cube(vertic, color, indice, normal) {
    colors.push(...color);
    normals.push(...normal);
    indices.push(...indice);
    vertices.push(...vertic);

    const { gl } = store;

    let indicesArray = new Uint8Array(indices);
    let indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesArray, gl.STATIC_DRAW);
}

export function drawCube() {
    if (indices.length === 0) {
        return;
    }

    const { gl, program } = store;

    let colorArray = new Float32Array(colors);
    let normalsArray = new Float32Array(normals);
    let verticesArray = new Float32Array(vertices);

    initArrayBuffer(gl, program, colorArray, 3, gl.FLOAT, 'a_color');
    initArrayBuffer(gl, program, normalsArray, 3, gl.FLOAT, 'a_normal');
    initArrayBuffer(gl, program, verticesArray, 3, gl.FLOAT, 'a_position');
}

function initArrayBuffer(gl, program, data, num, type, attribute) {
    let buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    let a_attribute = gl.getAttribLocation(program, attribute);

    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
}
