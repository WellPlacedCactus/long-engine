
import { gl } from '../long.js';

export default class Shader {

	constructor(vsText, fsText) {
		this.program = this.createProgram();
		this.vs = this.createShader(gl.VERTEX_SHADER, vsText);
		this.fs = this.createShader(gl.FRAGMENT_SHADER, fsText);
		this.linkProgram(this.program, this.vs, this.fs);
		this.validateProgram(this.program);

		// UNIFORMS

		this.modelLocation = gl.getUniformLocation(this.program, 'model');
		this.viewLocation = gl.getUniformLocation(this.program, 'view');
		this.projLocation = gl.getUniformLocation(this.program, 'proj');

		// LIGHTING

		this.lightPositionLocation = gl.getUniformLocation(this.program, 'lightPos');
		this.cameraPositionLocation = gl.getUniformLocation(this.program, 'cameraPos');
		this.lightColorLocation = gl.getUniformLocation(this.program, 'lightColor');
	}

	createProgram() {
		const program = gl.createProgram();
		return program;
	}

	createShader(type, source) {
		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error('Error compiling shader!');
			console.error(gl.getShaderInfoLog(shader));
			return null;
		} else {
			return shader;
		}
	}

	linkProgram(program, vs, fs) {
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('Error linking program!');
			console.error(gl.getProgramInfoLog(program));
		}
	}

	validateProgram(program) {
		gl.validateProgram(program);
		if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
			console.error('Error validating program!');
			console.error(gl.getProgramInfoLog(program));
		}
	}

	// UTIL METHODS

	bind() {
		gl.useProgram(this.program);
	}

	unbind() {
		gl.useProgram(null);
	}

	// MATRIX SETTER METHODS

	setModel(value) {
		gl.uniformMatrix4fv(this.modelLocation, gl.FALSE, value);
	}
	
	setView(value) {
		gl.uniformMatrix4fv(this.viewLocation, gl.FALSE, value);
	}

	setProj(value) {
		gl.uniformMatrix4fv(this.projLocation, gl.FALSE, value);
	}
	
	// LIGHTING METHODS

	setLightConstants(lightPosition, cameraPosition, lightColor, material) {
		gl.uniform3f(
			this.lightPositionLocation,
			lightPosition[0],
			lightPosition[1],
			lightPosition[2]
		);
		gl.uniform3f(
			this.cameraPositionLocation,
			cameraPosition[0],
			cameraPosition[1],
			cameraPosition[2]
		);
		gl.uniform3f(
			this.lightColorLocation,
			lightColor[0],
			lightColor[1],
			lightColor[2]
		);

		gl.uniform3f(
			gl.getUniformLocation(this.program, 'material.ambient'),
			material.ambient[0],
			material.ambient[1],
			material.ambient[2],
		);
		gl.uniform3f(
			gl.getUniformLocation(this.program, 'material.diffuse'),
			material.diffuse[0],
			material.diffuse[1],
			material.diffuse[2],
		);
		gl.uniform3f(
			gl.getUniformLocation(this.program, 'material.specular'),
			material.specular[0],
			material.specular[1],
			material.specular[2],
		);
		gl.uniform1f(
			gl.getUniformLocation(this.program, 'material.shininess'),
			material.shininess
		);
	}
}