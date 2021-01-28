precision mediump float;

attribute vec3 v_position;
attribute vec2 v_texCoord;
attribute vec3 v_normal;

varying vec2 f_texCoord;
varying vec3 f_normal;
varying vec3 f_toLight;

uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;

uniform vec3 lightPosition;

void main()
{
	vec4 worldPosition = model * vec4(v_position, 1.0);
	f_texCoord = v_texCoord;
	f_normal = (model * vec4(v_normal, 0.0)).xyz;
	f_toLight = lightPosition - worldPosition.xyz;
	gl_Position = proj * view * worldPosition;
}