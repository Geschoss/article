import { webgl, webglUtils } from '../common';

const vertexShaderSource = `#version 300 es
in vec2 a_position;
in vec2 a_texCoord;

uniform vec2 u_resolution;

out vec2 v_texCoord;

void main() {
  vec2 zeroToOne = a_position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace, 0, 1);
  v_texCoord = a_texCoord;
}
`;
const fragmentShaderSource = `#version 300 es
precision highp float;
uniform sample2D u_image;
invec2 v_texCoord;

out vec4 outColor;

void main() {
    outColor = texture(u_image, v_texCoord);
}
`;
export const texture = (gl) => {
  let program = webgl.createProgramFromSources(
    gl,
    vertexShaderSource,
    fragmentShaderSource
  );
  
  let positionAttributeLocation = gl.getAttribLocation(
    program,
    'a_position'
  );
  let texCoordAttributeLocation = gl.getAttribLocation(
    program,
    'a_texCoord'
  );

  let colorLocation = gl.getUniformLocation(
    program,
    'u_color'
  );
  var resolutionUniformLocation = gl.getUniformLocation(
    program,
    'u_resolution'
  );
  var imageLocation = gl.getUniformLocation(
    program,
    'u_image'
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

  // Setup a random rectangle
  setRectangle(
    gl,
    randomInt(300),
    randomInt(300),
    randomInt(300),
    randomInt(300),
    randomInt(360)
  );

  // Set a random color.
  gl.uniform4f(
    colorLocation,
    Math.random(),
    Math.random(),
    Math.random(),
    1
  );

  // Draw the rectangle.
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
};


function randomInt(range) {
  return Math.floor(Math.random() * range);
}

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
                      x + width, y,
                      x, y + height,
                      x, y + height,
                      x + width, y + height,
                      x + width, y,
                  ])
      ),
      gl.STATIC_DRAW
    );
  }
}