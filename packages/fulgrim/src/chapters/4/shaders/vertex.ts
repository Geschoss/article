export const vertex = `
uniform mat4 u_ModelMatrix;
attribute float a_PointSize;
attribute vec4 a_Position;

void main() {
    gl_Position = u_ModelMatrix * a_Position;
    gl_PointSize = a_PointSize; // point rendering only
}
`;
