precision mediump float;

varying vec3 f_position;
varying vec3 f_normal;

struct Material
{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};

uniform vec3 lightPos;
uniform vec3 cameraPos;
uniform vec3 lightColor;
uniform Material material;

void main()
{
	// AMBIENT
	vec3 ambient = material.ambient * lightColor;

	// DIFFUSE
	vec3 norm = normalize(f_normal);
	vec3 lightDir = normalize(lightPos - f_position);
	vec3 diffuse = (max(dot(norm, lightDir), 0.0) * material.diffuse) * lightColor;

	// SPECULAR
	vec3 viewDir = normalize(cameraPos - f_position);
	vec3 reflectDir = reflect(-lightDir, norm);
	vec3 specular = (pow(max(dot(viewDir, reflectDir), 0.0), material.shininess) * material.specular) * lightColor;

	vec3 final = (ambient + diffuse + specular);
	gl_FragColor = vec4(final, 1.0);
}