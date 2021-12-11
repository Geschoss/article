export const vertex = `#version 300 es
in vec4 a_position;
in float a_size;

void main() {
    gl_Position = a_position;
    gl_PointSize = a_size;
}
`;
