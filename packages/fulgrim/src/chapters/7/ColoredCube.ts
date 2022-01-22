import { setup, draw, canvas, background, shaders } from '../../sdk';
import { cube } from '../../sdk/entities';
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

export const ColoredCude = () => {
    let matrix = new Matrix4();

    // prettier-ignore
    var vertices = [
        1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,  // v0-v1-v2-v3 front
        1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,  // v0-v3-v4-v5 right
        1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
       -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,  // v1-v6-v7-v2 left
       -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,  // v7-v4-v3-v2 down
        1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0   // v4-v7-v6-v5 back
    ];

    // prettier-ignore
    var colors = [
        0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  // v0-v1-v2-v3 front(blue)
        0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  // v0-v3-v4-v5 right(green)
        1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
        1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  // v1-v6-v7-v2 left
        1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v7-v4-v3-v2 down
        0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0   // v4-v7-v6-v5 back
    ];

    // prettier-ignore
    var indices = [
        0, 1, 2,   0, 2, 3,    // front
        4, 5, 6,   4, 6, 7,    // right
        8, 9,10,   8,10,11,    // up
       12,13,14,  12,14,15,    // left
       16,17,18,  16,18,19,    // down
       20,21,22,  20,22,23     // back
    ];

    setup(() => {
        canvas(800, 800);
        background();

        shaders(vertex, fragment);

        cube(vertices, colors, indices);
    });

    let angle = 10;

    keydown((keys) => ({
        [keys.LEFT]: () => (angle += 10),
        [keys.RIGHT]: () => (angle -= 10),
    }));

    draw((state) => {
        // angle += 1;

        matrix
            .setPerspective(30, 1, 1, 100)
            .lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0)
            .rotate(angle, 0, 1, 0);

        let u_matrix = state.gl.getUniformLocation(state.program, 'u_matrix');

        state.gl.uniformMatrix4fv(u_matrix, false, matrix.elements);

        let indicesArray = new Uint8Array(indices);
        let indicesBuffer = state.gl.createBuffer();
        state.gl.bindBuffer(state.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
        state.gl.bufferData(
            state.gl.ELEMENT_ARRAY_BUFFER,
            indicesArray,
            state.gl.STATIC_DRAW
        );

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
