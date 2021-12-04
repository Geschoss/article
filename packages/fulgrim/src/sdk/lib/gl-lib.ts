export function createBuffer(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    array: Float32Array,
    size: number,
    name: string
) {
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);

    const attribute = gl.getAttribLocation(program, name);

    gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribute);
}
