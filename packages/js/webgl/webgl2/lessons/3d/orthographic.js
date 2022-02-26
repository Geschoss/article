import { webgl, webglUtils, keydown, mouseover, m4 } from '../common';

const vertexShaderSource = `#version 300 es
in vec4 a_position;
in vec4 a_color;
uniform mat4 u_matrix;
out vec4 v_color;

void main() {
  gl_Position = u_matrix * a_position;
  v_color = a_color;
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;
in vec4 v_color;
out vec4 outColor;

void main() {
    outColor = v_color;
}
`;

export const orthographic = (gl, canvas) => {
  let scale = [1, 1, 1];
  let degrees = [0, 40, 0];
  let translation = [100, 100, 100];

  let width = gl.canvas.width;
  let height = gl.canvas.height;

  webgl.init(gl);
  webgl.createVShader(vertexShaderSource);
  webgl.createFShader(fragmentShaderSource);
  let program = webgl.createProgram();

  let colorAttributeLocation = gl.getAttribLocation(
    program,
    'a_color'
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
    let size = 3;
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
  mouseover({
    h: (value) => {
      degrees[1] = degrees[1] + value;
    },
    v: (value) => {
      degrees[0] = degrees[0] + value;
    },
    afterAll: () => {
      drawScene();
    }
  }, canvas);

  // create the color buffer, make it the current ARRAY_BUFFER
  // and copy in the color values
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setColors(gl);

  // Turn on the attribute
  gl.enableVertexAttribArray(colorAttributeLocation);

  // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
  var size = 3;          // 3 components per iteration
  var type = gl.UNSIGNED_BYTE;   // the data is 8bit unsigned bytes
  var normalize = true;  // convert from 0-255 to 0.0-1.0
  var stride = 0;        // 0 = move forward size * sizeof(type) each
  // iteration to get the next color
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
    colorAttributeLocation, size, type, normalize, stride, offset);

  // Update the position buffer with rectangle positions
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl);

  drawScene();
  gl.enable(gl.DEPTH_TEST);

  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL ho to convert from clip space to pixels
    gl.viewport(0, 0, width, height);
    // Clear the canvas
    gl.clearColor(1, 1, 1, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Tell it ti use our program (pair of shaders)
    gl.useProgram(program);
    // Bind the attribute/buffer set we want
    gl.bindVertexArray(vao)
    // Compute the matrix

    var left = 0;
    var right = gl.canvas.clientWidth;
    var bottom = gl.canvas.clientHeight;
    var top = 0;
    var near = 400;
    var far = -400;
    let matrix = m4.orthographic(left, right, bottom, top, near, far);
    matrix = m4.translate(
      matrix,
      translation[0],
      translation[1],
      translation[2]
    );
    matrix = m4.xRotate(matrix, degrees[0] * (Math.PI / 180));
    matrix = m4.yRotate(matrix, degrees[1] * (Math.PI / 180));
    matrix = m4.zRotate(matrix, degrees[2] * (Math.PI / 180));
    matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);
    // Set the matrix
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    // Draw the rectangle
    {
      let primitiveType = gl.TRIANGLES;
      let offset = 0;
      let count = 6 * 16;
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
      // left column front
      0, 0, 0,
      30, 0, 0,
      0, 150, 0,
      0, 150, 0,
      30, 0, 0,
      30, 150, 0,

      // top rung front
      30, 0, 0,
      100, 0, 0,
      30, 30, 0,
      30, 30, 0,
      100, 0, 0,
      100, 30, 0,

      // middle rung front
      30, 60, 0,
      67, 60, 0,
      30, 90, 0,
      30, 90, 0,
      67, 60, 0,
      67, 90, 0,

      // left column back
      0, 0, 30,
      30, 0, 30,
      0, 150, 30,
      0, 150, 30,
      30, 0, 30,
      30, 150, 30,

      // top rung back
      30, 0, 30,
      100, 0, 30,
      30, 30, 30,
      30, 30, 30,
      100, 0, 30,
      100, 30, 30,

      // middle rung back
      30, 60, 30,
      67, 60, 30,
      30, 90, 30,
      30, 90, 30,
      67, 60, 30,
      67, 90, 30,

      // top
      0, 0, 0,
      100, 0, 0,
      100, 0, 30,
      0, 0, 0,
      100, 0, 30,
      0, 0, 30,

      // top rung right
      100, 0, 0,
      100, 30, 0,
      100, 30, 30,
      100, 0, 0,
      100, 30, 30,
      100, 0, 30,

      // under top rung
      30, 30, 0,
      30, 30, 30,
      100, 30, 30,
      30, 30, 0,
      100, 30, 30,
      100, 30, 0,

      // between top rung and middle
      30, 30, 0,
      30, 30, 30,
      30, 60, 30,
      30, 30, 0,
      30, 60, 30,
      30, 60, 0,

      // top of middle rung
      30, 60, 0,
      30, 60, 30,
      67, 60, 30,
      30, 60, 0,
      67, 60, 30,
      67, 60, 0,

      // right of middle rung
      67, 60, 0,
      67, 60, 30,
      67, 90, 30,
      67, 60, 0,
      67, 90, 30,
      67, 90, 0,

      // bottom of middle rung.
      30, 90, 0,
      30, 90, 30,
      67, 90, 30,
      30, 90, 0,
      67, 90, 30,
      67, 90, 0,

      // right of bottom
      30, 90, 0,
      30, 90, 30,
      30, 150, 30,
      30, 90, 0,
      30, 150, 30,
      30, 150, 0,

      // bottom
      0, 150, 0,
      0, 150, 30,
      30, 150, 30,
      0, 150, 0,
      30, 150, 30,
      30, 150, 0,

      // left side
      0, 0, 0,
      0, 0, 30,
      0, 150, 30,
      0, 0, 0,
      0, 150, 30,
      0, 150, 0,

    ]),
    gl.STATIC_DRAW);
}

// Fill the current ARRAY_BUFFER buffer with colors for the 'F'.
function setColors(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array([
      // left column front
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,

      // top rung front
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,

      // middle rung front
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,
      200, 70, 120,

      // left column back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

      // top rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

      // middle rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

      // top
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,

      // top rung right
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,

      // under top rung
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,

      // between top rung and middle
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,

      // top of middle rung
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,

      // right of middle rung
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,

      // bottom of middle rung.
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,

      // right of bottom
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,

      // bottom
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,

      // left side
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
    ]),
    gl.STATIC_DRAW);
}