
import { mat4, keys, hud } from '../long.js';

export default class Camera {

	constructor(position, direction, up) {
		this.position = position;
		this.direction = direction;
		this.up = up;
		this.angle = Math.PI / 2;
		this.view = new Float32Array(16);
	}

	move(x, y, z) {
		this.position[0] += x;
		this.position[1] += y;
		this.position[2] += z;
	}

	getView() {
		// update hud
		hud.pos.innerHTML = `x: ${Math.round(this.position[0])}, z: ${Math.round(this.position[2])}`;
		hud.rot.innerHTML = Math.round(this.angle * 180 / Math.PI);

		// movement
		if (keys[87]) {
			this.position[0] += Math.cos(this.angle) * 0.1; // x
			this.position[2] += Math.sin(this.angle) * 0.1; // z
		}
		if (keys[83]) {
			this.position[0] -= Math.cos(this.angle) * 0.1; // x
			this.position[2] -= Math.sin(this.angle) * 0.1; // z
		}
		if (keys[65]) {
			this.position[0] += Math.cos(this.angle - Math.PI / 2) * 0.1; // x
			this.position[2] += Math.sin(this.angle - Math.PI / 2) * 0.1; // z
		}
		if (keys[68]) {
			this.position[0] += Math.cos(this.angle + Math.PI / 2) * 0.1; // x
			this.position[2] += Math.sin(this.angle + Math.PI / 2) * 0.1; // z
		}

		// rotation
		if (keys[37]) this.angle -= 0.04;
		if (keys[39]) this.angle += 0.04;

		this.direction[0] = this.position[0] + Math.cos(this.angle); // x
		this.direction[2] = this.position[2] + Math.sin(this.angle); // z

		mat4.identity(this.view);
		mat4.lookAt(this.view, this.position, this.direction, this.up);
		return this.view;
	}
}