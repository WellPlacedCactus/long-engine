
import { canvas, mat4, keys, hud } from '../long.js';

export default class Camera {

	constructor(position, direction, up) {
		this.position = position;
		this.direction = direction;
		this.up = up;
		
		this.view = new Float32Array(16);
		this.angle = Math.PI / 2;
		this.sens = 0.3;
	}

	move(x, y, z) {
		this.position[0] += x;
		this.position[1] += y;
		this.position[2] += z;
	}

	input() {
		// running
		this.sens = (keys[16] || keys[17]) ? 1 : 0.3;

		// movement
		if (keys[87] || keys[38]) {
			this.position[0] += Math.cos(this.angle) * this.sens; // x
			this.position[2] += Math.sin(this.angle) * this.sens; // z
		}
		if (keys[83] || keys[40]) {
			this.position[0] -= Math.cos(this.angle) * this.sens; // x
			this.position[2] -= Math.sin(this.angle) * this.sens; // z
		}
		if (keys[65]) {
			this.position[0] += Math.cos(this.angle - Math.PI / 2) * this.sens; // x
			this.position[2] += Math.sin(this.angle - Math.PI / 2) * this.sens; // z
		}
		if (keys[68]) {
			this.position[0] += Math.cos(this.angle + Math.PI / 2) * this.sens; // x
			this.position[2] += Math.sin(this.angle + Math.PI / 2) * this.sens; // z
		}

		// rotation
		if (keys[37]) this.angle -= 0.04;
		if (keys[39]) this.angle += 0.04;
	}

	getView() {
		this.direction[0] = this.position[0] + Math.cos(this.angle);
		this.direction[1] = this.position[1];
		this.direction[2] = this.position[2] + Math.sin(this.angle);

		mat4.identity(this.view);
		mat4.lookAt(this.view, this.position, this.direction, this.up);
		return this.view;
	}
}