export const vertex = `#version 300 es
uniform mat4 u_ModelMatrix;
in vec4 a_Position;
in vec2 a_TexCoord;
out vec2 v_TexCoord;

void main() {
    gl_Position = u_ModelMatrix * a_Position;
    v_TexCoord = a_TexCoord;
}
`;
