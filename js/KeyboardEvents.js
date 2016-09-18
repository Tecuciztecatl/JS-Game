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
			//myApp.directionKeys[arg.keyCode] = arg.type == 'keydown';
			myApp.movePlayer(myApp.DIRECTION_LEFT);
		}
		// UP ARROW
		else if ( arg.keyCode == 38 ) {
			//myApp.directionKeys[arg.keyCode] = arg.type == 'keydown';
			myApp.movePlayer(myApp.DIRECTION_UP);
		}
		// RIGHT ARROW
		else if ( arg.keyCode == 39 ) {
			//myApp.directionKeys[arg.keyCode] = arg.type == 'keydown';
			myApp.movePlayer(myApp.DIRECTION_RIGHT);
		}
		// DOWN ARROW
		else if ( arg.keyCode == 40 ) {
			//myApp.directionKeys[arg.keyCode] = arg.type == 'keydown';
			myApp.movePlayer(myApp.DIRECTION_DOWN);
		}
	}

	function stopKeyboard(arg) {
		console.log(arg);
		// LEFT ARROW
		if ( arg.keyCode == 37 ) {
			//myApp.directionKeys[arg.keyCode] = arg.type == 'keydown';
			myApp.stopPlayer(myApp.DIRECTION_LEFT);
		}
		// UP ARROW
		else if ( arg.keyCode == 38 ) {
			//myApp.directionKeys[arg.keyCode] = arg.type == 'keydown';
			myApp.stopPlayer(myApp.DIRECTION_UP);
		}
		// RIGHT ARROW
		else if ( arg.keyCode == 39 ) {
			//myApp.directionKeys[arg.keyCode] = arg.type == 'keydown';
			myApp.stopPlayer(myApp.DIRECTION_RIGHT);
		}
		// DOWN ARROW
		else if ( arg.keyCode == 40 ) {
			//myApp.directionKeys[arg.keyCode] = arg.type == 'keydown';
			myApp.stopPlayer(myApp.DIRECTION_DOWN);
		}
	}
		
	return myApp;
} (MODULE || {}));