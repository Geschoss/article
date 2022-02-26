import { webgl, webglUtils, keydown, m3 } from '../common';

const vertexShaderSource = `#version 300 es
in vec2 a_position;
uniform vec2 u_resolution;
uniform mat3 u_matrix;

void main() {
  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec4 u_color;

out vec4 outColor;

void main() {
    outColor = u_color;
}
`;

export const matrices = (gl) => {
  let degrees = 0;
  let scale = [1, 1];
  let translation = [100, 100];
  let color = [Math.random(), Math.random(), Math.random(), 1];
  let width = gl.canvas.width;
  let height = gl.canvas.height;

  webgl.init(gl);
  webgl.createVShader(vertexShaderSource);
  webgl.createFShader(fragmentShaderSource);
  let program = webgl.createProgram();

  let colorLocation = gl.getUniformLocation(
    program,
    'u_color'
  );
  var matrixLocation = gl.getUniformLocation(
    program,
    'u_matrix'
  );
  let positionAttributeLocation = gl.getAttribLocation(
    program,
    'a_position'
  );
  let positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

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

  keydown(() => ({
    s: () => {
      translation[1] = 10 + translation[1];
    },
    w: () => {
      translation[1] = -10 + translation[1];
    },
    a: () => {
      translation[0] = -10 + translation[0];
    },
    d: () => {
      translation[0] = 10 + translation[0];
    },
    q: () => {
      degrees = degrees - 10;
    },
    e: () => {
      degrees = degrees + 10;
    },
    z: () => {
      scale[0] = scale[0] + 0.2;
      scale[1] = scale[1] + 0.2;
    },
    x: () => {
      scale[0] = scale[0] - 0.2;
      scale[1] = scale[1] - 0.2;
    },
    afterAll: () => {
      drawScene()
    }
  }))

  // Update the position buffer with rectangle positions
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl);

  drawScene();

  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL ho to convert from clip space to pixels
    gl.viewport(0, 0, width, height);
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Tell it ti use our program (pair of shaders)
    gl.useProgram(program);
    // Bind the attribute/buffer set we want
    gl.bindVertexArray(vao)
    // Set a the color
    gl.uniform4fv(colorLocation, color);
    // Compute the matrix
    let matrix = m3.projection(width, height)
    matrix = m3.translate(matrix,translation[0], translation[1]);
    matrix = m3.rotate(matrix, degrees * (Math.PI / 180));
    matrix = m3.scale(matrix, scale[0], scale[1]);
    matrix = m3.translate(matrix, -50, -75);
    // Set the matrix
    gl.uniformMatrix3fv(matrixLocation, false, matrix);
    // Draw the rectangle
    {
      let primitiveType = gl.TRIANGLES;
      let offset = 0;
      let count = 18;
      gl.drawArrays(primitiveType, offset, count);
    }

  }
};
// Fill the current ARRAY_BUFFER buffer
// with the values that define a letter 'F'.
function setGeometry(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      // left column
      0, 0,
      30, 0,
      0, 150,
      0, 150,
      30, 0,
      30, 150,

      // top rung
      30, 0,
      100, 0,
      30, 30,
      30, 30,
      100, 0,
      100, 30,

      // middle rung
      30, 60,
      67, 60,
      30, 90,
      30, 90,
      67, 60,
      67, 90,
    ]),
    gl.STATIC_DRAW);
}
