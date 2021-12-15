import { setup, draw, canvas, background, shaders } from '../../sdk';
import { cube, triangles } from '../../sdk/entities';
import { keydown } from '../../sdk/features';
import { Matrix4 } from '../../sdk/lib/matrix';

export const vertex = `#version 300 es
in vec4 a_position;
in vec4 a_color;
uniform mat4 u_matrix;

out vec4 o_color;

void main() {
    gl_Position = u_matrix * a_position;
    o_color = a_color;
}
`;

export const fragment = `#version 300 es
precision mediump float;
in vec4 o_color;
out vec4 fragColor;

void main() {
    fragColor = o_color;
}
`;

export const HelloCude = () => {
    let matrix = new Matrix4();

    let colors = [
        // Vertex coordinates and color
        1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  // v0 White
        -1.0,  1.0,  1.0,     1.0,  0.0,  1.0,  // v1 Magenta
        -1.0, -1.0,  1.0,     1.0,  0.0,  0.0,  // v2 Red
        1.0, -1.0,  1.0,     1.0,  1.0,  0.0,  // v3 Yellow
        1.0, -1.0, -1.0,     0.0,  1.0,  0.0,  // v4 Green
        1.0,  1.0, -1.0,     0.0,  1.0,  1.0,  // v5 Cyan
        -1.0,  1.0, -1.0,     0.0,  0.0,  1.0,  // v6 Blue
        -1.0, -1.0, -1.0,     0.0,  0.0,  0.0   // v7 Black
    ];

      // Indices of the vertices
    var indices = [
        0, 1, 2,   0, 2, 3,    // front
        0, 3, 4,   0, 4, 5,    // right
        0, 5, 6,   0, 6, 1,    // up
        1, 6, 7,   1, 7, 2,    // left
        7, 4, 3,   7, 3, 2,    // down
        4, 7, 6,   4, 6, 5     // back
    ];

    setup((state) => {
        canvas(800, 800);
        background();

        shaders(vertex, fragment);

        cube(colors, indices);
    });

    let angle = 10;

    keydown({
        39: () => (angle += 10),
        37: () => (angle -= 10),
    });

    draw((state) => {
        angle += 1;
        
        matrix
            .setPerspective(30, 1, 1, 100)
            .lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0)
            .rotate(angle, 0, 1, 0)

        let u_matrix = state.gl.getUniformLocation(
            state.program,
            'u_matrix'
        );

        state.gl.uniformMatrix4fv(u_matrix, false, matrix.elements);
        
        state.gl.enable(state.gl.DEPTH_TEST);
        state.gl.clear(state.gl.DEPTH_BUFFER_BIT | state.gl.COLOR_BUFFER_BIT);

        state.gl.drawElements(
            state.gl.TRIANGLES,
            indices.length,
            state.gl.UNSIGNED_BYTE,
            0
        );
    });
};
