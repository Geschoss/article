import {
    setup,
    draw,
    canvas,
    background,
    shaders,
    point,
} from '../../sdk';

export const vertex = `#version 300 es
in vec4 a_position;
in float a_size;

void main() {
    gl_Position = a_position;
    gl_PointSize = a_size;
}
`;

export const fragmetn = `#version 300 es
precision mediump float;
out vec4 fragColor;

void main() {
    fragColor = vec4(1.0, 1.0, 1.0, 1.0);;
}
`;

export const Shaders = () => {
    setup((state) => {
        canvas(600, 600);
        background();

        shaders(vertex, fragmetn);
    });

    draw(() => {
        point(0.4, 0.4, 10);
        point(-0.4, -0.4, 10);
    });
};
