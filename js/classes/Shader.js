
import { gl } from '../long.js';

export default class Shader {

	constructor(vsText, fsText) {
		this.program = this.createProgram();
		this.vs = this.createShader(gl.VERTEX_SHADER, vsText);
		this.fs = this.createShader(gl.FRAGMENT_SHADER, fsText);

		this.linkProgram(this.program, this.vs, this.fs);
		this.validateProgram(this.program);

		this.modelLocation = gl.getUniformLocation(this.program, 'model');
		this.viewLocation = gl.getUniformLocation(this.program, 'view');
		this.projLocation = gl.getUniformLocation(this.program, 'proj');
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
	
	// OTHER SETTER METHODS
	
	setVec3(name, value) {
		const location = gl.getUniformLocation(this.program, name);
		gl.uniform3f(location, value);
	}
}