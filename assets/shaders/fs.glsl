precision mediump float;

varying vec2 f_texCoord;
varying vec3 f_normal;
varying vec3 f_toLight;

uniform sampler2D sampler;

uniform vec3 lightColor;

void main()
{
	vec3 unitNormal = normalize(f_normal);
	vec3 unitLightVector = normalize(f_toLight);

	float poka = dot(unitNormal, unitLightVector);
	float brightness = max(poka, 0.0);
	vec3 diffuse = brightness * lightColor;

	gl_FragColor = vec4(diffuse, 1.0) * texture2D(sampler, f_texCoord);
}