
import { gl } from '../long.js';
import Mesh from './Mesh.js';

export default class Loader {
	
	constructor() {}

	loadMesh(positions, colors, indices) {
		this.loadAttribute(0, 2, positions);
		this.loadAttribute(1, 3, colors);
		this.loadIndices(indices);
		return new Mesh(indices.length);
	}

	loadAttribute(shaderLocation, vertexSize, data) {
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
		gl.vertexAttribPointer(shaderLocation, vertexSize, gl.FLOAT,  gl.FALSE, vertexSize * Float32Array.BYTES_PER_ELEMENT, 0);
		return buffer;
	}

	loadIndices(data) {
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
		return buffer;
	}
}