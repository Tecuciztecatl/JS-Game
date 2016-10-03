var MODULE = (function (myApp) {
	myApp.canvas.addEventListener('touchstart', startTouch, false);
	myApp.canvas.addEventListener('touchend', endTouch, false);
	myApp.canvas.addEventListener("touchcancel", cancelTouch, false);
	myApp.canvas.addEventListener("touchmove", moveTouch, false);

	//var ongoingTouches = new Array();



	function startTouch(event) {
		console.log (event.touches[0]);
		//console.log (arg.touches[0].screenX);

		 event.preventDefault();
		  //console.log("touchstart.");
		  var touches = event.changedTouches;
		  //console.log(touches);
		        
		  for (var i = 0; i < touches.length; i++) {
		    console.log("touchstart:" + i + "...");

		    // Put the touch event into the inputInteractions array so the app can handle it.
	    	var touch = copyTouch(touches[i]);
		    myApp.inputInteractions.push(touch);
		   	
		   	console.log("touchstart:" + i + ".");
		  }
		  // Handle input to update the touch interactions with the current screen.
		  myApp.handleInput();

		//myApp.movePlayer(event);
	}


	function moveTouch(event) {
		event.preventDefault();
		var touches = event.changedTouches;

		for (var i = 0; i < touches.length; i++) {
			// Find the touch ID to modify.
			var idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) {
				console.log("continuing touch "+idx +", pressed: "+myApp.inputInteractions[idx].pressed);

			    // Put the touch event into the inputInteractions array so the app can handle it. Remove the previous one.
		    	var touch = copyTouch(touches[i], myApp.inputInteractions[idx].isPressing, myApp.inputInteractions[idx].pressed);
		    	myApp.inputInteractions.splice(idx, 1, touch);
				//console.log(".");
			} else {
				console.log("can't figure out which touch to continue");
			}
		}
		//Handle input to update the touch interactions wit the current screen.
    	myApp.handleInput();
	} 

	function endTouch(event) {
		event.preventDefault();
		console.log("touchend");
		var touches = event.changedTouches;

		for (var i = 0; i < touches.length; i++) {
			var idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) {
			    // Put the touch event into the canceledInputInteractions array so the app can handle the cancelation. Remove the curent one.
				myApp.canceledInputInteractions.push(myApp.inputInteractions[idx]);
		    	myApp.inputInteractions.splice(idx, 1);
			} else {
				console.log("can't figure out which touch to end");
			}
		}
		//Handle input to update the touch interactions wit the current screen.
    	myApp.handleInput();
	} 

	function cancelTouch(event) {
		event.preventDefault();
		console.log("touchcancel.");
		var touches = event.changedTouches;

		for (var i = 0; i < touches.length; i++) {
			// Put the touch event into the canceledInputInteractions array so the app can handle the cancelation. Remove the curent one.
			myApp.canceledInputInteractions.push(myApp.inputInteractions[idx]);
		    myApp.inputInteractions.splice(i, 1);
		}
		//Handle input to update the touch interactions wit the current screen.

		myApp.handleInput();
	}

	function copyTouch(touch) {
		return { identifier: touch.identifier, x: touch.pageX, y: touch.pageY, w: touch.radiusX, h: touch.radiusY };
	}
	function copyTouch(touch, isPressing, pressed) {
		return { identifier: touch.identifier, x: touch.pageX, y: touch.pageY, w: touch.radiusX, h: touch.radiusY, isPressing: isPressing, pressed: pressed };
	}

	function ongoingTouchIndexById(idToFind) {
		for (var i = 0; i < myApp.inputInteractions.length; i++) {
			var id = myApp.inputInteractions[i].identifier;

			if (id == idToFind) {
				return i;
			}
		}
		return -1;    // not found
	}

	return myApp;
} (MODULE || {}));