import { setup, draw, canvas, background, shaders } from '../../sdk';
import { triangles } from '../../sdk/entities';
import { keydown } from '../../sdk/features';
import { Matrix4 } from '../../sdk/lib/matrix';

export const vertex = `#version 300 es
in vec4 a_position;
in vec4 a_color;
uniform mat4 u_modelMatrix;

out vec4 o_color;

void main() {
    gl_Position = u_modelMatrix * a_position;
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

export const LookAtTriangles = () => {
    setup((state) => {
        canvas(800, 800);
        background();

        shaders(vertex, fragment);

        triangles([
            0.0,
            0.5,
            -0.4,
            0.4,
            1.0,
            0.4, // The back green one
            -0.5,
            -0.5,
            -0.4,
            0.4,
            1.0,
            0.4,
            0.5,
            -0.5,
            -0.4,
            1.0,
            0.4,
            0.4,
        ]);

        triangles([
            0.5,
            0.4,
            -0.2,
            1.0,
            0.4,
            0.4, // The middle yellow one
            -0.5,
            0.4,
            -0.2,
            1.0,
            1.0,
            0.4,
            0.0,
            -0.6,
            -0.2,
            1.0,
            1.0,
            0.4,
        ]);

        triangles([
            0.0,
            0.5,
            0.0,
            0.4,
            0.4,
            1.0, // The front blue one
            -0.5,
            -0.5,
            0.0,
            0.4,
            0.4,
            1.0,
            0.5,
            -0.5,
            0.0,
            1.0,
            0.4,
            0.4,
        ]);
    });

    // Set the matrix to be used for to set the camera view
    let modelMatrix = new Matrix4();

    let g_near = 0.0;
    let g_far = 0.5;
    keydown((key) => {
        switch (key) {
            case 39:
                g_near += 0.1;
                break;
            case 37:
                g_near -= 0.1;
                break;
            case 38:
                g_far += 0.1;
                break;
            case 40:
                g_far -= 0.1;
                break;
        }
    });

    draw((state) => {
        modelMatrix.setOrtho(-1, 1, -1, 1, g_near, g_far);

        var u_modelMatrix = state.gl.getUniformLocation(
            state.program,
            'u_modelMatrix'
        );

        // Set the view matrix
        state.gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);

        // Clear <canvas>
        state.gl.clear(state.gl.COLOR_BUFFER_BIT);

        // Draw the rectangle
        state.gl.drawArrays(state.gl.TRIANGLES, 0, 9);
    });
};
