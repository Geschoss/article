import { setup, draw, canvas, background, shaders } from '../../sdk';
import { cube } from '../../sdk/entities';
import { keydown } from '../../sdk/features';
import { Matrix4, Vector3 } from '../../sdk/lib/matrix';

export const vertex = `#version 300 es
in vec4 a_position;
in vec4 a_color;
in vec4 a_normal;

uniform mat4 u_matrix;
uniform vec3 u_lightColor;
uniform vec3 u_lightDirection;

out vec4 o_color;

void main() {
    gl_Position = u_matrix * a_position;
    // Make the length of the normal 1.0
    vec3 normal = normalize(a_normal.xyz);
    // Dot product of light direction and orientation of a surface
    float nDotL = max(dot(u_lightDirection, normal), 0.0);
    // Calculate the color due to diffuse reflection
    vec3 diffuse = u_lightColor * a_color.rgb * nDotL;

    o_color = vec4(diffuse, a_color.a);
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

export const LightedCude = () => {
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
        1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v1-v2-v3 front
        1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v3-v4-v5 right
        1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v5-v6-v1 up
        1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v1-v6-v7-v2 left
        1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v7-v4-v3-v2 down
        1, 0, 0,   1, 0, 0,   0, 1, 0,  0, 1, 0    // v4-v7-v6-v5 back
    ];
    // prettier-ignore
    var normals = new Float32Array([    // Normal
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
       -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
        0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
        0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
      ]);

    // prettier-ignore
    var indices = [
        0, 1, 2,   0, 2, 3,    // front
        4, 5, 6,   4, 6, 7,    // right
        8, 9,10,   8,10,11,    // up
       12,13,14,  12,14,15,    // left
       16,17,18,  16,18,19,    // down
       20,21,22,  20,22,23     // back
    ];

    setup((state) => {
        canvas(800, 800);
        background();

        shaders(vertex, fragment);

        cube(vertices, colors, indices, normals);

        matrix.setPerspective(40, 1, 1, 100).lookAt(3, 3, 6, 0, 0, 0, 0, 1, 0);

        let u_matrix = state.gl.getUniformLocation(state.program, 'u_matrix');
        let u_lightColor = state.gl.getUniformLocation(
            state.program,
            'u_lightColor'
        );
        state.gl.uniform3f(u_lightColor, 1.0, 0.0, 0.0);

        let u_lightDirection = state.gl.getUniformLocation(
            state.program,
            'u_lightDirection'
        );
        const lightDirection = new Vector3([1, 3.0, 4.0]);
        lightDirection.normalize();
        state.gl.uniform3fv(u_lightDirection, lightDirection.elements);

        let angle = 0;

        keydown((keys) => ({
            [keys.LEFT]: () => (angle += 10),
            [keys.RIGHT]: () => (angle -= 10),
        }));

        draw(() => {
            matrix.rotate(angle, 0, 1, 0);
            angle = 0;

            state.gl.uniformMatrix4fv(u_matrix, false, matrix.elements);

            state.gl.enable(state.gl.DEPTH_TEST);
            state.gl.clear(
                state.gl.DEPTH_BUFFER_BIT | state.gl.COLOR_BUFFER_BIT
            );

            state.gl.drawElements(
                state.gl.TRIANGLES,
                indices.length,
                state.gl.UNSIGNED_BYTE,
                0
            );
        });
    });
};
