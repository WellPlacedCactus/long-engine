
import Shader from './classes/Shader.js';
import Loader from './classes/Loader.js';
import Renderer from './classes/Renderer.js';
import Camera from './classes/Camera.js';

import Cube from './classes/Cube.js';
import Texture from './classes/Texture.js';
import Entity from './classes/Entity.js';
import Light from './classes/Light.js';

// ENGINE STUFF

export const canvas = document.createElement('canvas');
export const gl = canvas.getContext('webgl');
export const mat4 = glMatrix.mat4;
export const keys = [];

// UTIL FUNCTIONS

export const randi = (min, max) => Math.floor(Math.random() * (max - min) + min);
export const randf = (min, max) => Math.random() * (max - min) + min;
export const rands = () => Math.random() > 0.5 ? 1 : -1;

// HUD ELEMENTS
export const hud = {};
hud.pos = document.getElementById('pos');
hud.rot = document.getElementById('rot');

const init = async function() {
	canvas.width = 640;
	canvas.height = 480;
	document.body.append(canvas);
	gl.viewport(0, 0, canvas.width, canvas.height);
	loadAssets();
}

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
	const renderer = new Renderer(45, canvas.width / canvas.height, 0.1, 1000.0);
	const camera = new Camera([0, 0, -10], [0, 0, 0], [0, 1, 0]);

	const mesh = loader.loadMesh(Cube.positions, Cube.texCoords, Cube.normals, Cube.indices);
	const texture = new Texture(res.crate);
	const entities = [];
	const light = new Light(camera.position, [1, 1, 1]);

	for (let i = 0; i < 15; i++) {
		entities.push(new Entity(
			[randf(-20, 20), 0, randf(-20, 20)],
			[0, randi(0, 180), 0],
			[1, 1, 1]
		));
	}

	function loop() {
		light.position = camera.position;
		shader.bind();
		shader.setProj(renderer.getProj());
		shader.setView(camera.getView());
		shader.setLight(light);
		renderer.renderClear();
		renderer.renderEntities(shader, mesh, texture, entities);
		shader.unbind();
		requestAnimationFrame(loop);
	}
	
	loop();
}

// ASSET LOADING

const loadTextFromFile = function(path) {
	return new Promise(resolve => {
		fetch(path)
		.then(res => res.text())
		.then(text => {
			resolve(text);
		});
	});
}

const loadImageFromFile = function(path) {
	return new Promise(resolve => {
		const image = new Image();
		image.onload = function() {
			resolve(image);
		}
		image.src = path;
	});
}

// INPUT METHODS

window.onload = init;
window.onkeydown = ({keyCode}) => keys[keyCode] = true;
window.onkeyup = ({keyCode}) => keys[keyCode] = false;