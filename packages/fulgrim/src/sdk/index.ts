import { getWebGLContext, initShaders } from './lib/cuon-utils';
import { createState } from './state';

const state = createState();
export const createCanvas = (width: number, height: number) => {
    // + create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.id = 'canvas_id';
    document.body.appendChild(canvas);
    // -

    // + init webGl
    const gl = getWebGLContext(canvas);
    // -
    state.init({ canvas, gl });
};

const toRGB = 2.55 * 100;
export const background = (red = 0, green = red, blue = red, alpha = 1) => {
    const { gl } = state;

    gl.clearColor(red / toRGB, green / toRGB, blue / toRGB, alpha);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

export const setup = (cb: (store: typeof state) => void) => {
    cb(state);
};

export const draw = (cb: (store: typeof state, time: number) => void) => {
    let start = 0;
    const tick = () => {
        requestAnimationFrame((time) => {
            const { gl, points, lines } = state;

            gl.clear(gl.COLOR_BUFFER_BIT);

            cb(state, Math.floor(time - start));

            if (points.length > 0) {
                drawPoints();
            }

            if (lines.length > 0) {
                drawLines();
            }
            start = time;
            tick();
        });
    };
    tick();
};

export const shaders = (vertex: string, fragmetn: string) => {
    const { gl } = state;
    let program = initShaders(gl, vertex, fragmetn);

    state.program = program;
};


const drawLines = () => {
    const { gl, program, lines } = state;

    const verticesLines = new Float32Array(lines);
    state.lines = [];

    const n = verticesLines.length / 2;

    const FSIZE = verticesLines.BYTES_PER_ELEMENT;
    const vertexLinesBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexLinesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesLines, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 2, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.LINES, 0, n);
};

const drawPoints = () => {
    const { gl, program, points } = state;

    const verticesPoints = new Float32Array(points);
    state.points = [];

    const n = verticesPoints.length / 2;

    const FSIZE = verticesPoints.BYTES_PER_ELEMENT;
    const vertexPointsBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPointsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesPoints, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 2, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.POINTS, 0, n);
};

export const point = (x: number, y: number) => {
    const { points } = state;

    points.push(x);
    points.push(y);
};

export const line = (v0: number, v1: number, v2: number, v3: number) => {
    const { lines } = state;

    lines.push(v0);
    lines.push(v1);
    lines.push(v2);
    lines.push(v3);
};
