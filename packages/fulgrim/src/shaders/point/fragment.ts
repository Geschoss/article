export const fragmetn = `
precision mediump float;
// uniform vec4 u_FregColor;
varying vec4 v_Color;
uniform float u_Width;
uniform float u_Height;
void main() {
    // gl_FragColor = u_FregColor;
    gl_FragColor = vec4(gl_FragCoord.x/u_Width, 0.0, gl_FragCoord.y/u_Height, 1.0);
}
`;
