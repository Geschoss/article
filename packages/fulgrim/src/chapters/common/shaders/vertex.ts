export const vertex = `
// attribute float a_PointSize;
attribute vec4 a_Position;

void main() {
    gl_Position = a_Position;
    // gl_PointSize = a_PointSize; // point rendering only
    gl_PointSize = 5.0; // point rendering only
}
`;
