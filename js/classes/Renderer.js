
import { gl, mat4 } from '../long.js';
import Light from './Light.js';

export default class Renderer {

	constructor(fov, asp, near, far) {
		this.fov = fov;
		this.asp = asp;
		this.near = near;
		this.far = far;
		this.proj = new Float32Array(16);
	}

	getProj() {
		mat4.identity(this.proj);
		mat4.perspective(this.proj, this.fov * Math.PI / 180, this.asp, this.near, this.far);
		return this.proj;
	}

	enableAttribs() {
		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
		gl.enableVertexAttribArray(2);
	}

	disableAttribs() {
		gl.disableVertexAttribArray(2);
		gl.disableVertexAttribArray(1);
		gl.disableVertexAttribArray(0);
	}

	renderClear() {
		// gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.frontFace(gl.CCW);
		gl.cullFace(gl.BACK);
	}

	renderEntities(shader, mesh, texture, entities, camera) {
		texture.bind();
		this.enableAttribs();
		entities.forEach(e => {
			shader.setModel(e.getModel());
			shader.setLight(camera, e.color);
			gl.drawElements(gl.TRIANGLES, mesh.vertexCount, gl.UNSIGNED_SHORT, 0);
		});
		this.disableAttribs();
		texture.unbind();
	}
}