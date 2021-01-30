
import { mat4, keys } from '../long.js';

export default class Camera {

	constructor(position, direction) {
		this.position = position;
		this.direction = direction;
		this.view = new Float32Array(16);
		this.angle = Math.PI / 2;
		this.sens = 0.2;
		
		// JUMPING MECH
		
		this.g = 0.01;
		this.velY = 0;
		this.power = 0.5;
		this.canJump = true;
	}

	move() {
		if (keys[87] || keys[38]) this.moveInDirection(this.angle);
		if (keys[83] || keys[40]) this.moveInDirection(this.angle + Math.PI);
		if (keys[65]) this.moveInDirection(this.angle - Math.PI / 2);
		if (keys[68]) this.moveInDirection(this.angle + Math.PI / 2);
		if (keys[37]) this.angle -= 0.04;
		if (keys[39]) this.angle += 0.04;
	}

	moveInDirection(rad) {
		this.position[0] += Math.cos(rad) * this.sens;
		this.position[2] += Math.sin(rad) * this.sens;
	}

	jump() {
		if (keys[32] && this.canJump) {
			this.velY += this.power;
			this.canJump = false;
		}
	}

	fall() {
		this.velY -= this.g;
		this.position[1] += this.velY;
	}

	collide() {
		if (this.position[1] < 0) {
			this.velY = 0;
			this.position[1] = 0;
			this.canJump = true;
		}
	}

	update() {
		this.move();
		this.jump();
		this.fall();
		this.collide();
	}

	getView() {
		this.direction[0] = this.position[0] + Math.cos(this.angle);
		this.direction[1] = this.position[1];
		this.direction[2] = this.position[2] + Math.sin(this.angle);

		mat4.identity(this.view);
		mat4.lookAt(
			this.view,
			this.position,
			this.direction,
			[0, 1, 0]);
		return this.view;
	}
}