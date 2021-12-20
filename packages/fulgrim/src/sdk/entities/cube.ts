import { store } from '../features';

let colors = [];
let indices = [];
let vertices = [];

export function cube(vertic, color, indice) {
    colors.push(...color);
    indices.push(...indice);
    vertices.push(...vertic);
}

export function drawCube() {
    if (indices.length === 0) {
        return;
    }

    const { gl, program } = store;

    let colorArray = new Float32Array(colors);
    let verticesArray = new Float32Array(vertices);
    
    initArrayBuffer(gl, program,  verticesArray, 3, gl.FLOAT, 'a_position');
    initArrayBuffer(gl, program, colorArray, 3, gl.FLOAT, 'a_color'); 
}

function initArrayBuffer(gl, program, data, num, type, attribute) {
    let buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    let a_attribute = gl.getAttribLocation(program, attribute);

    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
}
