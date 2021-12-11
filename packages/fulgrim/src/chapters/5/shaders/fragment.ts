export const fragmetn = `#version 300 es
precision mediump float;
uniform sampler2D u_Sampler0;
uniform sampler2D u_Sampler1;
in vec2 v_TexCoord;
out vec4 fragColor;

void main() {
    vec4 color0 = texture(u_Sampler0, v_TexCoord);
    vec4 color1 = texture(u_Sampler1, v_TexCoord);
    fragColor = color0 * color1;
}
`;
