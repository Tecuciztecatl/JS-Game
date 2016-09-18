var MODULE = (function (myApp) {
	myApp.canvas.addEventListener('mousedown', myApp.movePlayer);
	myApp.canvas.addEventListener('mouseup', myApp.stopPlayer);
		
	return myApp;
} (MODULE || {}));