precision mediump float;

varying vec2 f_texCoord;
varying vec3 f_color;

uniform sampler2D sampler;

void main()
{
	gl_FragColor = texture2D(sampler, f_texCoord) * vec4(f_color, 1.0);
}