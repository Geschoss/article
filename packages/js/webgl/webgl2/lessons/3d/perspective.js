import { webgl, webglUtils, keydown, mouseover, m4 } from '../common';
import { F } from './enteties';

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

export const perspective = (gl, canvas) => {
  let translation = [-150, 0, -360];
  let rotation = [degToRad(190), degToRad(40), degToRad(30)];
  let scale = [1, 1, 1];
  let fieldOfViewRadians = degToRad(60);

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
      rotation[1] = rotation[1] - value*0.1;
    },
    v: (value) => {
      rotation[0] = rotation[0] + value*0.1;
    },
    afterAll: () => {
      drawScene();
    }
  }, canvas);

  keydown(({
    w: () => {
      translation[2] = translation[2] - 10;
    },
    s: () => {
      translation[2] = translation[2] + 10;
    },
    a: () => {
      translation[0] = translation[0] + 10;
    },
    d: () => {
      translation[0] = translation[0] - 10;
    },
    afterAll: () => {
      drawScene();
    }
  }))

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
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let zNear = 1;
    let zFar = 2000;
    let matrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
    matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
    matrix = m4.xRotate(matrix, rotation[0]);
    matrix = m4.yRotate(matrix, rotation[1]);
    matrix = m4.zRotate(matrix, rotation[2]);
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
    new Float32Array(F.points),
    gl.STATIC_DRAW);
}

// Fill the current ARRAY_BUFFER buffer with colors for the 'F'.
function setColors(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array(F.colors),
    gl.STATIC_DRAW);
}

function radToDeg(r) {
  return r * 180 / Math.PI;
}

function degToRad(d) {
  return d * Math.PI / 180;
}