
import { gl } from '../long.js';

export default class Renderer {

	constructor() {}

	renderClear() {
		gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	}

	renderMesh(mesh) {
		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
		gl.drawElements(gl.TRIANGLES, mesh.vertexCount, gl.UNSIGNED_SHORT, 0);
		gl.disableVertexAttribArray(1);
		gl.disableVertexAttribArray(0);
	}
}