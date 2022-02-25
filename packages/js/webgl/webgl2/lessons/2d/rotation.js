import { webgl, webglUtils, keydown } from '../common';

const vertexShaderSource = `#version 300 es
in vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform vec2 u_rotation;

void main() {
  vec2 rotatedPosition = vec2(
    a_position.x * u_rotation.y + a_position.y * u_rotation.x,
    a_position.y * u_rotation.y - a_position.x * u_rotation.x
  );
  vec2 position = rotatedPosition + u_translation;
  vec2 zeroToOne = position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace, 0, 1);
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

export const rotation_1 = (gl) => {
  let degrees = 0;
  let translation = [100, 100];
  let color = [Math.random(), Math.random(), Math.random(), 1]

  webgl.init(gl);
  webgl.createVShader(vertexShaderSource);
  webgl.createFShader(fragmentShaderSource);
  let program = webgl.createProgram();

  let colorLocation = gl.getUniformLocation(
    program,
    'u_color'
  );
  var resolutionUniformLocation = gl.getUniformLocation(
    program,
    'u_resolution'
  );
  var translationUniformLocation = gl.getUniformLocation(
    program,
    'u_translation'
  );
  var rotationLocation = gl.getUniformLocation(
    program,
    'u_rotation'
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
    w: () => {
      translation[1] = 10 + translation[1];
    },
    s: () => {
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
    afterAll: () => {
      drawScene()
    }
  }))

  drawScene();

  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL ho to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Tell it ti use our program (pair of shaders)
    gl.useProgram(program);
    // Bind the attribute/buffer set we want
    gl.bindVertexArray(vao)
    // Pass in the canvas resolution so we can convert from
    // pixels to clip space in the shader
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
    // Update the position buffer with rectangle positions
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);
    // Set a the color
    gl.uniform4fv(colorLocation, color);
    // Aet the translation
    gl.uniform2fv(translationUniformLocation, translation)
    // Set the rotation
    gl.uniform2fv(rotationLocation, [
      Math.sin(degrees * (Math.PI / 180)),
      Math.cos(degrees * (Math.PI / 180)),
    ])
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
      67, 90
    ]),
    gl.STATIC_DRAW);
}
