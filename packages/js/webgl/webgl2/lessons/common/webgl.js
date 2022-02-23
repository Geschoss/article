function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  let success = gl.getShaderParameter(
    shader,
    gl.COMPILE_STATUS
  );
  if (success) {
    return shader;
  }
  console.error(
    `Can't compile shader! log: ${gl.getShaderInfoLog(
      shader
    )}`
  );
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(
    program,
    gl.LINK_STATUS
  );
  if (success) {
    return program;
  }
  console.error(
    `Can't create program! Log: ${gl.getProgramInfoLog(
      program
    )}`
  );
  gl.deleteProgram(program);
}
function createVShader(gl, source) {
  return createShader(gl, gl.VERTEX_SHADER, source);
}

function createFShader(gl, source) {
  return createShader(gl, gl.FRAGMENT_SHADER, source);
}
const webglSDK = () => {
  let gl;
  let vertexS;
  let fragmetnS;

  let init = (_gl) => {
    gl = _gl;
  };

  return {
    init,
    createVShader: (source) => {
      vertexS = createVShader(gl, source);
    },
    createFShader: (source) => {
      fragmetnS = createFShader(gl, source);
    },
    createProgram: () => {
      return createProgram(gl, vertexS, fragmetnS);
    },
  };
};

export const webgl = webglSDK();
