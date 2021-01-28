
export default class Quad {}

Quad.positions = [
	-0.5,  0.5,
	-0.5, -0.5,
	 0.5, -0.5,
	 0.5,  0.5
];

Quad.texCoords = [
	0.0, 1.0,
	0.0, 0.0,
	1.0, 0.0,
	1.0, 1.0
];

Quad.normals = [
	1.0, 1.0,
	1.0, 1.0,
	1.0, 1.0,
	1.0, 1.0
];

Quad.colors = [
	1.0, 0.0, 1.0,
	0.0, 1.0, 1.0,
	0.0, 1.0, 0.0,
	1.0, 1.0, 0.0
];

Quad.indices = [
	0, 1, 2,
	0, 2, 3
];