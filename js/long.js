
import Shader from './classes/Shader.js';
import Loader from './classes/Loader.js';
import Renderer from './classes/Renderer.js';

// ENGINE STUFF

export const canvas = document.createElement('canvas');
export const gl = canvas.getContext('webgl');

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
	demo({
		vsText: vsText,
		fsText: fsText
	});
}

// GAME CODE

const demo = function(res) {

	const positions = [
		-0.5,  0.5,
		-0.5, -0.5,
		 0.5, -0.5,
		 0.5,  0.5
	];
	
	const colors = [
		1.0, 0.0, 1.0,
		0.0, 1.0, 1.0,
		0.0, 1.0, 0.0,
		1.0, 1.0, 0.0
	];
	
	const indices = [
		0, 1, 2,
		0, 2, 3
	];
	
	const shader = new Shader(res.vsText, res.fsText);
	const loader = new Loader();
	const renderer = new Renderer();
	const mesh = loader.loadMesh(positions, colors, indices);
	
	function loop() {
		renderer.renderClear();
		shader.bind();
		renderer.renderMesh(mesh);
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

// MAIN METHOD

window.onload = init;