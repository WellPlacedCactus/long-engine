precision mediump float;

attribute vec3 v_position;
attribute vec3 v_normal;

varying vec3 f_position;
varying vec3 f_normal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;

void main()
{
	gl_Position = proj * view * model * vec4(v_position, 1.0);
	f_position = vec3(model * vec4(v_position, 1.0));
	f_normal = v_normal;
}