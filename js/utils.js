
// ASSET LOADING

export const loadTextFromFile = function(path) {
	return new Promise(resolve => {
		fetch(path)
		.then(res => res.text())
		.then(text => {
			resolve(text);
		});
	});
}

export const loadImageFromFile = function(path) {
	return new Promise(resolve => {
		const image = new Image();
		image.onload = function() {
			resolve(image);
		}
		image.src = path;
	});
}

// NUMBER GENERATORS

export const randi = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export const randf = function(min, max) {
	return Math.random() * (max - min) + min;
}

export const rands = function() {
	return Math.random() > 0.5 ? 1 : -1;
}