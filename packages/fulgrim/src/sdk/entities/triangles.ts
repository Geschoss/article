import { store } from '../features';

export function triangles(coords) {
    const { triangles } = store;

    triangles.push(...coords);
}

export function drawTriangles() {
    const { gl, program, triangles } = store;

    var array = new Float32Array(triangles);
    
    // Create a buffer object
    var vertexColorbuffer = gl.createBuffer();

    // Write the vertex coordinates and color to the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);

    var FSIZE = array.BYTES_PER_ELEMENT;
    // Assign the buffer object to a_Position and enable the assignment
    var a_Position = gl.getAttribLocation(program, 'a_position');

    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color and enable the assignment
    var a_Color = gl.getAttribLocation(program, 'a_color');

    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}
