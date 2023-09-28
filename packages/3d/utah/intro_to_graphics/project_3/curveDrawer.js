// [TO-DO] Complete the implementation of the following class and the vertex shader below.

class CurveDrawer {
  constructor() {
    this.prog = InitShaderProgram(curvesVS, curvesFS);

    this.mvp = gl.getUniformLocation(this.prog, 'mvp');
    this.p0 = gl.getUniformLocation(this.prog, 'p0');
    this.p1 = gl.getUniformLocation(this.prog, 'p1');
    this.p2 = gl.getUniformLocation(this.prog, 'p2');
    this.p3 = gl.getUniformLocation(this.prog, 'p3');

    this.t = gl.getAttribLocation(this.prog, 't');

    // Initialize the attribute buffer
    this.steps = 100;
    var tv = [];
    for (var i = 0; i < this.steps; ++i) {
      tv.push(i / (this.steps - 1));
    }

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tv), gl.STATIC_DRAW);
  }
  setViewport(width, height) {
    let trans = [
      2 / width,
      0,
      0,
      0,
      0,
      -2 / height,
      0,
      0,
      0,
      0,
      1,
      0,
      -1,
      1,
      0,
      1,
    ];
    gl.useProgram(this.prog); // Bind the program
    gl.uniformMatrix4fv(this.mvp, false, trans);
  }
  updatePoints(pts) {
    gl.useProgram(this.prog);

    let p = [];
    pts.forEach((pt) => {
      p.push([pt.getAttribute('cx'), pt.getAttribute('cy')]);
    });

    gl.uniform2fv(this.p0, p[0]);
    gl.uniform2fv(this.p1, p[1]);
    gl.uniform2fv(this.p2, p[2]);
    gl.uniform2fv(this.p3, p[3]);
  }
  draw() {
    gl.useProgram(this.prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.vertexAttribPointer(this.t, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.t);
    gl.drawArrays(gl.LINE_STRIP, 0, this.steps);
  }
}

// Vertex Shader
var curvesVS_2 = `
	attribute float t;
	uniform mat4 mvp;
	uniform vec2 p0;
	uniform vec2 p1;
	uniform vec2 p2;
	uniform vec2 p3;
	void main()
	{
    float x = pow((1.0 - t), 2.0) * p0.x +
              2.0 * (1.0 - t) * t * p1.x + pow(t, 2.0) * p2.x;
    float y = pow((1.0 - t), 2.0) * p0.y +
              2.0 * (1.0 - t) * t * p1.y + pow(t, 2.0) * p2.y;

		gl_Position = mvp * vec4(x, y, 0, 1);
	}
`;


var curvesVS = `
	attribute float t;
	uniform mat4 mvp;
	uniform vec2 p0;
	uniform vec2 p1;
	uniform vec2 p2;
	uniform vec2 p3;
	void main()
	{
		float x = pow((1.0 - t),3.0) * p0.x + 
                        3.0 * pow((1.0 - t),2.0) * t * p1.x + 
                        3.0 * (1.0 - t) * pow(t,2.0) * p2.x +
                        pow(t,3.0) * p3.x;
		float y = pow((1.0 - t),3.0) * p0.y + 
                        3.0 * pow((1.0 - t),2.0) * t * p1.y + 
                        3.0 * (1.0 - t) * pow(t,2.0) * p2.y +
                        pow(t,3.0) * p3.y;
		gl_Position = mvp * vec4(x, y, 0, 1);
	}
`;

// Fragment Shader
var curvesFS = `
	precision mediump float;
	void main()
	{
		gl_FragColor = vec4(1,0,0,1);
	}
`;
