import { store } from '../features/state';

export const line = (v0: number, v1: number, v2: number, v3: number) => {
    const { lines } = store;

    lines.push(v0);
    lines.push(v1);
    lines.push(v2);
    lines.push(v3);
};

export const drawLines = () => {
    const { gl, program, lines } = store;

    const verticesLines = new Float32Array(lines);
    store.lines = [];

    const n = verticesLines.length / 2;

    const FSIZE = verticesLines.BYTES_PER_ELEMENT;
    const vertexLinesBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexLinesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesLines, gl.STATIC_DRAW);

    const a_position = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, FSIZE * 2, 0);
    gl.enableVertexAttribArray(a_position);

    gl.drawArrays(gl.LINES, 0, n);
};
