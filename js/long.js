
import { loadTextFromFile, randi } from './utils.js';

import Shader from './classes/Shader.js';
import Loader from './classes/Loader.js';
import Renderer from './classes/Renderer.js';
import Camera from './classes/Camera.js';

import Cube from './classes/Cube.js';
import Material from './classes/Material.js';
import Entity from './classes/Entity.js';

// ENGINE CONSTANTS

export const canvas = document.createElement('canvas');
export const gl = canvas.getContext('webgl');
export const mat4 = glMatrix.mat4;
export const keys = [];

// ENGINE SETUP

const init = async function() {
	canvas.width = 640 * 1.5;
	canvas.height = 480 * 1.5;
	document.body.append(canvas);
	gl.viewport(0, 0, canvas.width, canvas.height);
	loadAssets();
}

// ACTUAL ASSET LOADING

const loadAssets = async function() {
	const vsText = await loadTextFromFile('assets/shaders/vs.glsl');
	const fsText = await loadTextFromFile('assets/shaders/fs.glsl');
	demo(vsText, fsText);
}

// GAME CODE

const demo = function(vsText, fsText) {

	const shader = new Shader(vsText, fsText);
	const loader = new Loader();
	const renderer = new Renderer(75, canvas.width / canvas.height, 0.1, 1000.0);
	const camera = new Camera([0, 0, 0], [0, 0, 0]);
	
	const cube = loader.loadMesh(Cube.positions, Cube.normals, Cube.indices);
	const material = new Material(
		[0.1745, 0.01175, 0.01175],
		[0.61424, 0.04136, 0.04136],
		[0.727811, 0.626959, 0.626959],
		0.6
	);
	const entities = [];

	// GENERATE GROUND STICKS

	for (let z = 0; z < 25; z++) {
		for (let x = 0; x < 25; x++) {
			if (Math.random() < 0.4) {
				for (let i = 0; i < randi(1, 5); i++) {
					entities.push(new Entity(
						[x * 5, i * 2, z * 5],
						[0, 0, 0],
						[1, 1, 1],
					));
				}
			}
		}
	}

	function loop() {
		camera.update();
		shader.bind();
		shader.setProj(renderer.getProj());
		shader.setView(camera.getView());
		shader.setLightConstants(
			camera.position,
			camera.position,
			[0.8, 0.8, 0.8],
			material
		);
		renderer.renderClear();
		renderer.renderEntities(shader, cube, entities);
		shader.unbind();
		requestAnimationFrame(loop);
	}
	
	loop();
}

// INPUT ENGINE SETUP

window.onload = init;
window.onkeydown = ({keyCode}) => keys[keyCode] = true;
window.onkeyup = ({keyCode}) => keys[keyCode] = false;