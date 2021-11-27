export const vertex = `
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
void main() {
    gl_Position = u_ModelMatrix * a_Position;
    // gl_PointSize = 4.0; // point rendering only
}
`;
