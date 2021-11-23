export const vertex = `
attribute vec4 a_Position;
uniform mat4 u_xformMatrix;
void main() {
    gl_Position = a_Position * u_xformMatrix;
    // gl_PointSize = 4.0; // point rendering only
}
`;
