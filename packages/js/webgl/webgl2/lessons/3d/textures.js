import {
  webgl,
  webglUtils,
  keydown,
  mouseover,
  m4,
} from '../common';
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

export const textures = (gl) => {
  let fieldOfViewRadians = webglUtils.degToRad(60);
  let cameraAngleRadians = webglUtils.degToRad(0);

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

  // create the color buffer, make it the current ARRAY_BUFFER
  // and copy in the color values
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setColors(gl);

  // Turn on the attribute
  gl.enableVertexAttribArray(colorAttributeLocation);

  // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
  var size = 3; // 3 components per iteration
  var type = gl.UNSIGNED_BYTE; // the data is 8bit unsigned bytes
  var normalize = true; // convert from 0-255 to 0.0-1.0
  var stride = 0; // 0 = move forward size * sizeof(type) each
  // iteration to get the next color
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    colorAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  // Update the position buffer with rectangle positions
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl);

  gl.enable(gl.DEPTH_TEST);
  let then = 0;
  requestAnimationFrame(drawScene);

  function drawScene(now) {
    // Convert the time to seconds
    now *= 0.001;
    // Subtract the previous time from the current time
    var deltaTime = now - then;
    // Remember the current time for the next frame.
    then = now;
    cameraAngleRadians += deltaTime;

    let numFs = 5;
    let radius = 200;
    // Every frame increase the rotation a little.
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL ho to convert from clip space to pixels
    gl.viewport(0, 0, width, height);
    // Clear the canvas
    gl.clearColor(1, 1, 1, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Tell it ti use our program (pair of shaders)
    gl.useProgram(program);
    // Bind the attribute/buffer set we want
    gl.bindVertexArray(vao);
    // Compute the matrix
    let aspect = width / height;
    let zNear = 1;
    let zFar = 2000;
    let projectionMatrix = m4.perspective(
      fieldOfViewRadians,
      aspect,
      zNear,
      zFar
    );
    // Compute the position of the first F
    let fPosition = [radius, 1, 40];
    // Use matrix math to compute a position on the circle.
    var cameraMatrix = m4.yRotation(cameraAngleRadians);
    cameraMatrix = m4.translate(
      cameraMatrix,
      20,
      20,
      radius * 2
    );

    // Get the camera's postion from the matrix we computed
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    // Compute the camera's matrix using look at.
    cameraMatrix = m4.lookAt(cameraPosition, fPosition, up);
    // Make a view matrix from the camera matrix.
    let viewMatrix = m4.inverse(cameraMatrix);
    // move the projection space to view space (the space in front of
    // the camera)
    let viewProjectionMatrix = m4.multiply(
      projectionMatrix,
      viewMatrix
    );

    // Draw 'F's in a circle
    for (var ii = 0; ii < numFs; ++ii) {
      let angle = (ii * Math.PI * 2) / numFs;

      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius;
      // add in the translation for this F
      let matrix = m4.translate(
        viewProjectionMatrix,
        x,
        0,
        z
      );

      // Set the matrix.
      gl.uniformMatrix4fv(matrixLocation, false, matrix);

      // Draw the geometry.
      let primitiveType = gl.TRIANGLES;
      let offset = 0;
      let count = 16 * 6;
      gl.drawArrays(primitiveType, offset, count);
    }
    requestAnimationFrame(drawScene);
  }
};
// Fill the current ARRAY_BUFFER buffer
// with the values that define a letter 'F'.
function setGeometry(gl) {
  let positions = new Float32Array(F.points);
  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  let matrix = m4.xRotation(Math.PI);
  matrix = m4.translate(matrix, -50, -75, -15);

  for (let ii = 0; ii < positions.length; ii += 3) {
    let vector = m4.transformVector(matrix, [
      positions[ii + 0],
      positions[ii + 1],
      positions[ii + 2],
      1,
    ]);
    positions[ii + 0] = vector[0];
    positions[ii + 1] = vector[1];
    positions[ii + 2] = vector[2];
  }

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}

// Fill the current ARRAY_BUFFER buffer with colors for the 'F'.
function setColors(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array(F.colors),
    gl.STATIC_DRAW
  );
}
