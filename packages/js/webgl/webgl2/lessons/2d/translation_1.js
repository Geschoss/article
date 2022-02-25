import { webgl, webglUtils, keydown } from '../common';

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

uniform vec4 u_color;

out vec4 outColor;

void main() {
    outColor = u_color;
}
`;

export const translation_1 = (gl) => {
  let degrees = 0;
  let translation = [100, 100];
  let width = 50;
  let height = 300;
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
    setRectangle(gl, translation[0], translation[1], width, height, degrees);
    // Set a the color
    gl.uniform4fv(colorLocation, color);
    // Draw the rectangle
    {
      let primitiveType = gl.TRIANGLES;
      let offset = 0;
      let count = 24;
      gl.drawArrays(primitiveType, offset, count);
    }
  }
};

function setRectangle(gl, x, y, width, height, degrees) {
  {
    let rot = (() => {
      let rotation = degrees * (Math.PI / 180);
      let cos = Math.cos(rotation);
      let sin = Math.sin(rotation);
      let halfW = width / 2;
      let halfH = height / 2;
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
          x, y + height,
          x + width, y + height,

          x, y,
          x + width, y,
          x + width, y + height,

          x + width, y + height,          
          x + width +  (height / 2), y + height,          
          x + width, y + height - width,
          
          x + width, y + height - width,
          x + width + (height / 2), y + height,
          x + width + (height / 2), y + height - width,

          x + width, y + height,          
          x + width +  (height / 2), y + height,          
          x + width, y + height - width,
          
          x + width, y + height - width,
          x + width + (height / 2), y + height,
          x + width + (height / 2), y + height - width,

          x + width, y + (height / 2) + width,
          x + width + (height / 3), y + (height / 2) + width,   
          x + width, y + (height / 2),

          x + width, y + (height / 2),
          x + width + (height / 3), y + (height / 2) + width,
          x + width + (height / 3), y + (height / 2),
        ])
      ),
      gl.STATIC_DRAW
    );
  }
}