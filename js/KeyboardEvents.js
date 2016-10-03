var MODULE = (function (myApp) {
	myApp.canvas.addEventListener('keydown', checkKeyboard);
	myApp.canvas.addEventListener('keyup', stopKeyboard);

	function checkKeyboard(arg) {
		console.log(arg);
		if ( arg.keyCode == 27 ) {
			myApp.gameLive = !myApp.gameLive;
			console.log(myApp.gameLive);
		}
		// LEFT ARROW
		if ( arg.keyCode == 37 ) {
			myApp.press(myApp.LEFT);
		}
		// UP ARROW
		else if ( arg.keyCode == 38 ) {
			myApp.press(myApp.UP);
		}
		// RIGHT ARROW
		else if ( arg.keyCode == 39 ) {
			myApp.press(myApp.RIGHT);
		}
		// DOWN ARROW
		else if ( arg.keyCode == 40 ) {
			myApp.press(myApp.DOWN);
		}
	}

	function stopKeyboard(arg) {
		console.log(arg);
		// LEFT ARROW
		if ( arg.keyCode == 37 ) {
			myApp.release(myApp.LEFT);
		}
		// UP ARROW
		else if ( arg.keyCode == 38 ) {
			myApp.release(myApp.UP);
		}
		// RIGHT ARROW
		else if ( arg.keyCode == 39 ) {
			myApp.release(myApp.RIGHT);
		}
		// DOWN ARROW
		else if ( arg.keyCode == 40 ) {
			myApp.release(myApp.DOWN);
		}
	}
		
	return myApp;
} (MODULE || {}));