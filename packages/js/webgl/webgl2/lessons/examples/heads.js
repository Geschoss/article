import { webgl, webglUtils, keydown, mouseover, m4 } from '../common';
import { headData } from './data/headdata';

const vertexShaderSource = `#version 300 es
in vec4 a_position;
in vec4 a_color;
uniform mat4 u_matrix;
out vec4 v_color;

void main() {
  gl_Position = u_matrix * a_position;
  v_color = a_color;
}
`
const fragmentShaderSource = `#version 300 es
precision highp float;
in vec4 v_color;
out vec4 outColor;
void main() {
  outColor = v_color;
}
`

export const heads = (gl) => {
  let program = webgl.createProgramFromSources(
    gl,
    vertexShaderSource,
    fragmentShaderSource
  );
  let colorAL = gl.getAttribLocation(program, 'a_color');
  let positionAL = gl.getAttribLocation(program, 'a_position');
  let matrixL = gl.getUniformLocation(program, 'u_matrix');

  let positionBuffer = gl.createBuffer();
  let vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAL);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  let numVertices = setGeometry(gl);
  {
    let size = 3;           // components per iteration
    let type = gl.FLOAT;    // the data is 32bit floats
    let normalize = false;  // don't normalize the data
    let stride = 0;         // 0 = move forward siae * sizeof(type)
    let offset = 0;         // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAL, size, type, normalize, stride, offset
    );
  }
  // create the colot buffer, make it the current ARRAY_BUFFER
  // and copy in the color values
  let colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setColors(gl);
  // Turn on the attribute
  gl.enableVertexAttribArray(colorAL);
  {
    let size = 3;           // components per iteration
    let type = gl.UNSIGNED_BYTE;    // the data is 8bit unsigned bytes
    let normalize = true;  // convert from 0-255 to 0.0-1.0
    let stride = 0;         // 0 = move forward siae * sizeof(type)
    let offset = 0;         // start at the beginning of the buffer 
    gl.vertexAttribPointer(
      colorAL, size, type, normalize, stride, offset
    );
  }

  let target = [0, 100, 800];
  let targetAngleRadians = 0;
  let targetRadius = 800;
  let fieldOfViewRadians = webglUtils.degToRad(60);

  drawScene();

  mouseover({
    v: (value) => {
      target[1] = target[1] - value;
    },
    h: (value) => {
      targetAngleRadians =  targetAngleRadians + webglUtils.degToRad(value);
      target[0] = Math.sin(targetAngleRadians) * targetRadius;
      target[2] = Math.cos(targetAngleRadians) * targetRadius;
    },
    afterAll: () => {
      drawScene();
    }
  }, gl.canvas)
  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Clear the canvas AND the depth buffer
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // turn on depth testing
    gl.enable(gl.DEPTH_TEST);
    // tell webgl to cull faces
    gl.enable(gl.CULL_FACE);
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
    // bind the attribute/buffer set we want
    gl.bindVertexArray(vao);
    // Compute the matrix
    {
      let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      let zNear = 1;
      let zFar = 3000;
      let projectionMatrix = m4.perspective(
        fieldOfViewRadians,
        aspect,
        zNear,
        zFar
      );
      let cameraTarget = [0, -100, 0];
      let cameraPosition = [1000, 500, 1000];
      let up = [0, 1, 0];
      // Compute the camera's matrix using look at
      let cameraMatrix = m4.lookAt(cameraPosition, cameraTarget, up);
      // Make a view matrix from the camera matrix
      let viewMatrix = m4.inverse(cameraMatrix);
      // create a viewProjection matrix. Thiswill both apply perspective
      // AND move the world so that the camera is effectively the origin
      let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
      // Draw heads in a grid
      let deep = 15;
      let across = 15;
      for (let zz = 0; zz < deep; ++zz) {
        let v = zz / (deep - 1);
        let z = (v - .5) * deep * 150;
        for (let xx = 0; xx < across; ++xx) {
          let u = xx / (across - 1);
          let x = (u - .5) * across * 150;
          let matrix = m4.lookAt([x, 0, z], target, up);
          drawHead(matrix, viewProjectionMatrix, matrixL, numVertices);
        }
      }
      drawHead(
        m4.translation(target[0], target[1], target[2]),
        viewProjectionMatrix,
        matrixL,
        numVertices
      );
    }
  }

  function drawHead(matrix, viewProjectionMatrix, matrixLocation, numVertices) {
    // multiply that with the viewProjectionMatrix
    matrix = m4.multiply(viewProjectionMatrix, matrix);
    // Set the matrix
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    // Draw the geometry
    {
      let primitiveType = gl.TRIANGLES;
      let offset = 0;
      gl.drawArrays(primitiveType, offset, numVertices);
    }
  }
}


function setGeometry(gl) {
  let positions = new Float32Array(headData.positions);
  let matrix = m4.scale(m4.yRotation(Math.PI), 6, 6, 6);
  for (let ii = 0; ii < positions.length; ii += 3) {
    let vector = m4.transformVector(
      matrix,
      [positions[ii + 0], positions[ii + 1], positions[ii + 2], 1]
    );
    positions[ii + 0] = vector[0];
    positions[ii + 1] = vector[1];
    positions[ii + 2] = vector[2];
  }
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  return positions.length / 3;
}

function setColors(gl) {
  let normals = headData.normals;
  let colors = new Uint8Array(normals.length);
  let offset = 0;
  for (let ii = 0; ii < colors.length; ii += 3) {
    for (let jj = 0; jj < 3; ++jj) {
      colors[offset] = (normals[offset] * 0.5 + 0.5) * 255;
      ++offset;
    }
  }
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
}