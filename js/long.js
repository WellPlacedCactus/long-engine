
import { loadTextFromFile, loadImageFromFile, randi } from './utils.js';

import Shader from './classes/Shader.js';
import Loader from './classes/Loader.js';
import Renderer from './classes/Renderer.js';
import Camera from './classes/Camera.js';

import Cube from './classes/Cube.js';
import Material from './classes/Material.js';
import Entity from './classes/Entity.js';

// QUANG TRONG ENGINE CONSTANTS

export const canvas = document.createElement('canvas');
export const gl = canvas.getContext('webgl');
export const mat4 = glMatrix.mat4;
export const keys = [];

// HUD ENGINE CONSTANTS
export const hud = {};
hud.pos = document.getElementById('pos');
hud.rot = document.getElementById('rot');

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
	const crate = await loadImageFromFile('assets/images/crate.png');
	demo({
		vsText: vsText,
		fsText: fsText,
		crate: crate
	});
}

// GAME CODE

const demo = function(res) {

	const shader = new Shader(res.vsText, res.fsText);
	const loader = new Loader();
	const renderer = new Renderer(75, canvas.width / canvas.height, 0.1, 1000.0);
	const camera = new Camera([25, 0, 25], [0, 0, 0], [0, 1, 0], canvas);

	const mesh = loader.loadMesh(Cube.positions, Cube.normals, Cube.indices);
	const material = new Material(
		[0.24725, 0.1995, 0.0745],
		[0.75164, 0.60648, 0.22648],
		[0.628281, 0.555802, 0.366065],
		0.4
	);
	const entities = [];

	entities.push(new Entity(
		[25 * 2, -2, 25 * 2],
		[0, 0, 0],
		[25 * 2, 1, 25 * 2]
	));

	for (let z = 0; z < 25; z++) {
		for (let x = 0; x < 25; x++) {
			if (Math.random() < 0.2) {
				for (let i = 0; i < randi(2, 10); i++) {
					entities.push(new Entity(
						[x * 4, i * 2, z * 4],
						[0, 0, 0],
						[1, 1, 1]
					));
				}
			}
		}
	}

	function updateHUD() {
		hud.pos.innerHTML = `x: ${Math.round(camera.position[0])}, z: ${Math.round(camera.position[2])}`;
		hud.rot.innerHTML = Math.round(camera.angle * 180 / Math.PI);
	}

	function loop() {
		camera.input();
		updateHUD();
		shader.bind();
		shader.setProj(renderer.getProj());
		shader.setView(camera.getView());
		shader.setLightConstants(
			camera.position,
			camera.position,
			[1, 1, 1],
			material
		);
		renderer.renderClear();
		renderer.renderEntities(shader, mesh, entities);
		shader.unbind();
		requestAnimationFrame(loop);
	}
	
	loop();
}

// INPUT ENGINE SETUP

window.onload = init;
window.onkeydown = ({keyCode}) => keys[keyCode] = true;
window.onkeyup = ({keyCode}) => keys[keyCode] = false;