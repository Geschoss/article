export const fragmetn = `
precision mediump float;
// uniform vec4 u_FregColor;
varying vec4 v_Color;
void main() {
    // gl_FragColor = u_FregColor;
    gl_FragColor = v_Color;
}
`;
