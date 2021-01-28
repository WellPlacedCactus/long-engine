precision mediump float;

attribute vec2 v_position;
attribute vec2 v_texCoord;
attribute vec3 v_color;

varying vec2 f_texCoord;
varying vec3 f_color;

uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;

void main()
{
	gl_Position = proj * view * model * vec4(v_position, 0.0, 1.0);
	f_texCoord = v_texCoord;
	f_color = v_color;
}