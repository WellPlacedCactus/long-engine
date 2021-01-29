
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

		this.lightPositionLocation = gl.getUniformLocation(this.program, 'lightPosition');
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
			console.error('Error vompiling shader!');
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

	setLight(camera, color) {
		// gl.uniform3f(
		// 	this.lightPositionLocation,
		// 	light.position[0],
		// 	light.position[1],
		// 	light.position[2]);
		// gl.uniform3f(
		// 	this.lightColorLocation,
		// 	light.color[0],
		// 	light.color[1],
		// 	light.color[2]);
		gl.uniform3f(
			this.lightPositionLocation,
			camera.position[0],
			camera.position[1],
			camera.position[2]);
		gl.uniform3f(
			this.lightColorLocation,
			color[0],
			color[1],
			color[2]);
	}
}