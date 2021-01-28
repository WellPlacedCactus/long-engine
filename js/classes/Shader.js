
import { gl } from '../long.js';

// THIS NEEDS A BIT OF WORK

export default class Shader {

	constructor(vsText, fsText) {
		this.vs = this.createShader(gl.VERTEX_SHADER, vsText);
		this.fs = this.createShader(gl.FRAGMENT_SHADER, fsText);
		this.program = gl.createProgram();
		this.linkProgram();
		this.validateProgram();
	}

	createShader(type, source) {
		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(shader));
			return null;
		} else {
			return shader;
		}
	}

	linkProgram() {
		gl.attachShader(this.program, this.vs);
		gl.attachShader(this.program, this.fs);
		gl.linkProgram(this.program);
		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.error('ERROR linking program!', gl.getProgramInfoLog(this.program));
		}
	}

	validateProgram() {
		gl.validateProgram(this.program);
		if (!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS)) {
			console.error('ERROR validating program!', gl.getProgramInfoLog(this.program));
		}
	}

	bind() { gl.useProgram(this.program); }

	unbind() { gl.useProgram(null); }
}