import { setup, draw, canvas, background, shaders } from '../../sdk';
import { triangles } from '../../sdk/entities';
import { keydown } from '../../sdk/features';
import { Matrix4 } from '../../sdk/lib/matrix';

export const vertex = `#version 300 es
in vec4 a_position;
in vec4 a_color;
uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projMatrix;

out vec4 o_color;

void main() {
    gl_Position = u_projMatrix * u_viewMatrix * u_modelMatrix * a_position;
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
    let viewMatrix = new Matrix4();
    let projMatrix = new Matrix4();
    let modelMatrix = new Matrix4();
    
    let g_eyeX = 0.0, // Eye position
        g_eyeY = 0.0,
        g_eyeZ = 5.0; 
    
    let step = 0.02

    let trees = [
        // Three triangles on the right side
        0.75,  1.0,  -4.0,  0.4,  1.0,  0.4, // The back green one
        0.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
        1.25, -1.0,  -4.0,  1.0,  0.4,  0.4, 

        0.75,  1.0,  -2.0,  1.0,  1.0,  0.4, // The middle yellow one
        0.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
        1.25, -1.0,  -2.0,  1.0,  0.4,  0.4, 

        0.75,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
        0.25, -1.0,   0.0,  0.4,  0.4,  1.0,
        1.25, -1.0,   0.0,  1.0,  0.4,  0.4, 

        // Three triangles on the left side
        -0.75,  1.0,  -4.0,  0.4,  1.0,  0.4, // The back green one
        -1.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
        -0.25, -1.0,  -4.0,  1.0,  0.4,  0.4, 

        -0.75,  1.0,  -2.0,  1.0,  1.0,  0.4, // The middle yellow one
        -1.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
        -0.25, -1.0,  -2.0,  1.0,  0.4,  0.4, 

        -0.75,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
        -1.25, -1.0,   0.0,  0.4,  0.4,  1.0,
        -0.25, -1.0,   0.0,  1.0,  0.4,  0.4,
    ];
    setup((state) => {
        canvas(800, 800);
        background();

        shaders(vertex, fragment);

        triangles(trees);
    });

    keydown({
        39: () => (g_eyeX += 0.1),
        37: () => (g_eyeX -= 0.1),
    });

    
    draw((state) => {
        g_eyeZ = g_eyeZ - step; 
        if (g_eyeZ < - 2 || g_eyeZ > 5) {
            step = step * -(1)
        }
        
        viewMatrix.setTranslate(0, 0, 0);
        projMatrix.setPerspective(30, state.width/state.height, 1, 100);
        modelMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, -100, 0, 1, 0);

        let u_modelMatrix = state.gl.getUniformLocation(
            state.program,
            'u_modelMatrix'
        );

        let u_projMatrix = state.gl.getUniformLocation(
            state.program,
            'u_projMatrix'
        );

        let u_viewMatrix = state.gl.getUniformLocation(
            state.program,
            'u_viewMatrix'
        );

        state.gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix.elements);
        state.gl.uniformMatrix4fv(u_projMatrix, false, projMatrix.elements);
        state.gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);

        state.gl.clear(state.gl.COLOR_BUFFER_BIT);

        state.gl.drawArrays(state.gl.TRIANGLES, 0, trees.length/6);
    });
};
