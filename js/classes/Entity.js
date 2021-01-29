
import { mat4 } from '../long.js';

export default class Entity {

	constructor(position, rotation, scale) {
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
		this.model = new Float32Array(16);
		this.rotX = Math.random() < 0.5 ? 1 : -1;
		this.rotY = Math.random() < 0.5 ? 1 : -1;
		this.color = [1, 1, 1];
		this.x = 0;
	}

	move(x, y, z) {
		this.position[0] += x;
		this.position[1] += y;
		this.position[2] += z;
	}

	rotate(x, y, z) {
		this.rotation[0] += x;
		this.rotation[1] += y;
		this.rotation[2] += z;
	}

	getModel() {
		this.rotate(this.rotX, this.rotY, 0);
		this.x += Math.random() * 0.1;
		this.color[1] = (Math.sin(this.x) + 1) / 2;
		this.color[2] = (Math.cos(this.x) + 1) / 2;

		// matrices
		let identity = mat4.create();
		let positionMatrix = mat4.create();
		let rotXMatrix = mat4.create();
		let rotYMatrix = mat4.create();
		let rotZMatrix = mat4.create();
		let scaleMatrix = mat4.create();

		// position
		positionMatrix = mat4.translate(positionMatrix, identity, this.position);

		// rotation
		mat4.rotate(rotXMatrix, identity, this.rotation[0] * Math.PI / 180, [1, 0, 0]);
		mat4.rotate(rotYMatrix, identity, this.rotation[1] * Math.PI / 180, [0, 1, 0]);
		mat4.rotate(rotZMatrix, identity, this.rotation[2] * Math.PI / 180, [0, 0, 1]);

		// scale
		scaleMatrix = mat4.scale(scaleMatrix, identity, this.scale);

		this.model = mat4.create();
		this.model = mat4.mul(this.model, this.model, positionMatrix);
		this.model = mat4.mul(this.model, this.model, rotXMatrix);
		this.model = mat4.mul(this.model, this.model, rotYMatrix);
		this.model = mat4.mul(this.model, this.model, rotZMatrix);
		this.model = mat4.mul(this.model, this.model, scaleMatrix);
		return this.model;
	}
}