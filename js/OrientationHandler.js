var MODULE = (function (myApp) {
	myApp.canvas.addEventListener('mousedown', myApp.movePlayer);
	myApp.canvas.addEventListener('mouseup', myApp.stopPlayer);
		
	myApp.orientationQuery = window.matchMedia('(orientation: landscape)');

	myApp.orientationHandler = function(orientation) {
		if (orientation.matches) {
			myApp.resume();
			//alert('landscape');
		}
		else {
			myApp.pause();
			//alert('portrait');
		}
	};
	// get notified when orientation changes
	myApp.orientationQuery.addListener(myApp.orientationHandler);

	// detect current orientation
	myApp.orientationHandler(myApp.orientationQuery);

	return myApp;
} (MODULE || {}));