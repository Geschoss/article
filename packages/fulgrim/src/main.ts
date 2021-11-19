import { getWebGLContext, initShaders } from './lib/cuon-utils';
import { point } from './shaders';
import './style.css';

const main = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const gl = getWebGLContext(canvas);

    const program = initShaders(gl, point.vertex, point.fragmetn);

    const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
    gl.vertexAttrib1f(a_PointSize, 20.0);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    const u_FregColor = gl.getUniformLocation(program, 'u_FregColor');

    canvas.onmousedown = function (event: MouseEvent) {
        click(event, gl, canvas, a_Position, u_FregColor);
    };

    gl.clearColor(0.0, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

const g_points = [];
function click(
    event: MouseEvent,
    gl: WebGLRenderingContext,
    canvas: HTMLCanvasElement,
    a_Position: number,
    u_FregColor: WebGLUniformLocation
) {
    const { width, height } = canvas;

    // @ts-ignore
    const rect = event.target.getBoundingClientRect() as DOMRect;

    const x = (event.clientX - rect.left - width / 2) / (width / 2);
    const y = (height / 2 - (event.clientY - rect.top)) / (height / 2);

    g_points.push({ x, y });

    gl.clear(gl.COLOR_BUFFER_BIT);

    g_points.forEach(({ x, y }) => {
        gl.vertexAttrib3f(a_Position, x, y, 0.0);

        const [v0, v1, v2, v3] = makePointColor(x, y);
        gl.uniform4f(u_FregColor, v0, v1, v2, v3);

        gl.drawArrays(gl.POINTS, 0, 1);
    });
}

function makePointColor(x, y) {
    if (x >= 0 && y >= 0) {
        return [1.0, 0.0, 0.0, 1.0];
    } else if (x < 0 && y < 0) {
        return [0, 1, 0, 1];
    }
    return [1, 1, 1, 1];
}

document.addEventListener('DOMContentLoaded', main);
