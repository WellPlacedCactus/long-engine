
import { mat4, keys } from '../long.js';

export default class Camera {

	constructor(position, direction, up) {
		this.position = position;
		this.direction = direction;
		this.up = up;
		
		this.view = new Float32Array(16);
		this.angle = Math.PI / 2 + Math.PI;
		this.sens = 0.3;
	}

	move(rad) {
		this.position[0] += Math.cos(rad) * this.sens; // x
		this.position[2] += Math.sin(rad) * this.sens; // z
	}


	input() {
		// running
		this.sens = (keys[16] || keys[17]) ? 1 : 0.3;

		// movement
		if (keys[87] || keys[38]) this.move(this.angle);
		if (keys[83] || keys[40]) this.move(this.angle + Math.PI);
		if (keys[65]) this.move(this.angle - Math.PI / 2);
		if (keys[68]) this.move(this.angle + Math.PI / 2);

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