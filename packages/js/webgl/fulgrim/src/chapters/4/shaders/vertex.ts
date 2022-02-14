export const vertex = `#version 300 es
uniform mat4 u_ModelMatrix;
in float a_PointSize;
in vec4 a_Position;

void main() {
    gl_Position = u_ModelMatrix * a_Position;
    gl_PointSize = a_PointSize; // point rendering only
}
`;
