import { store } from '../features/state';

export const point = (x: number, y: number, size = 1) => {
    const { points } = store;

    points.push(x);
    points.push(y);
    points.push(size);
};

export const drawPoints = () => {
    const { gl, program, points } = store;

    const verticesPoints = new Float32Array(points);
    store.points = [];
    
    const n = verticesPoints.length / 3;

    const FSIZE = verticesPoints.BYTES_PER_ELEMENT;
    const vertexPointsBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPointsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesPoints, gl.STATIC_DRAW);

    const a_position = gl.getAttribLocation(program, 'a_position');

    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, FSIZE * 3, 0);
    gl.enableVertexAttribArray(a_position);

    const a_size = gl.getAttribLocation(program, 'a_size');
    gl.vertexAttribPointer(a_size, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
    gl.enableVertexAttribArray(a_size);

    gl.drawArrays(gl.POINTS, 0, n);
};
