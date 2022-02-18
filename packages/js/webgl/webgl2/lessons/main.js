import { webgl, webglUtils } from './common';

const canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 400;
const gl = canvas.getContext('webgl2');

const vertexShaderSource = `#version 300 es
in vec2 a_position;

uniform vec2 u_resolution;

void main() {
  // convert the postion from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`;
const fragmentShaderSource = `#version 300 es
precision highp float;

out vec4 outColor;

void main() {
    outColor = vec4(1, 0, 0.5, 1);
}
`;

let vertexShader = webgl.createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSource
);
let fragmentShader = webgl.createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
);

let program = webgl.createProgram(
    gl,
    vertexShader,
    fragmentShader
);

var resolutionUniformLocation = gl.getUniformLocation(
    program,
    'u_resolution'
);

let positionAttributeLocation = gl.getAttribLocation(
    program,
    'a_position'
);
let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
{
    let degrees = 45;
    let x = 100;
    let y = 100;
    let width = 100;
    let heigth = 100;
    let rot = (() => {
        let rotation = degrees * (Math.PI / 180);
        let cos = Math.cos(rotation);
        let sin = Math.sin(rotation);
        let halfW = width/2;
        let halfH = heigth/2;
        return (arr) => {
            let result = [];
            for (let i = 0; i < arr.length; i = i + 2) {
                let xo = arr[i] - halfW - x;
                let yo = arr[i + 1] - halfH - y;
                let nx = cos * xo + sin * yo;
                let ny = cos * yo - sin * xo;
                result.push(nx + halfW + x);
                result.push(ny + halfH + y);
            }
            return result;
        };
    })();
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
            // prettier-ignore
            rot([
              x, y,
              x + width, y,
              x, y + heigth,

              x, y + heigth,
              x + width, y + heigth,
              x + width, y,
            ])
        ),
        gl.STATIC_DRAW
    );
}
let vao = gl.createVertexArray();
gl.bindVertexArray(vao);
gl.enableVertexAttribArray(positionAttributeLocation);
{
    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    );
}
webglUtils.resizeCanvasToDisplaySize(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);
// Pass in the canvas resolution so we can convert from
// pixels to clip space in the shader
gl.uniform2f(
    resolutionUniformLocation,
    gl.canvas.width,
    gl.canvas.height
);
gl.bindVertexArray(vao);
{
    let primitiveType = gl.TRIANGLES;
    let offset = 0;
    let count = 6;
    gl.drawArrays(primitiveType, offset, count);
}
