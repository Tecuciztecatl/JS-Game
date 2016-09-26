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

				//var touch = checkTouchCollisionWithArrows(copyTouch(touches[i]));
			    //ongoingTouches.push(touch);

	    	var touch = copyTouch(touches[i]);
		    myApp.inputInteractions.push(touch);
		   	
		   	console.log("touchstart:" + i + ".");
		  }
		  myApp.handleInput();

		//myApp.movePlayer(event);
	}


	function moveTouch(event) {
		event.preventDefault();
		var touches = event.changedTouches;

		for (var i = 0; i < touches.length; i++) {
			var idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) {
				console.log("continuing touch "+idx +", pressed: "+myApp.inputInteractions[idx].pressed);
				//console.log("ctx.moveTo(" + ongoingTouches[idx].x + ", " + ongoingTouches[idx].y + ");");
				//console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");

					//var touch = checkTouchCollisionWithArrows(copyTouch(touches[i], ongoingTouches[idx].direction));
					//ongoingTouches.splice(idx, 1, touch);  // swap in the new touch record
		    	var touch = copyTouch(touches[i], myApp.inputInteractions[idx].isPressing, myApp.inputInteractions[idx].pressed);
		    	myApp.inputInteractions.splice(idx, 1, touch);
		    	myApp.handleInput();
				//console.log(".");
			} else {
				console.log("can't figure out which touch to continue");
			}
		}
	} 

	function endTouch(event) {
		event.preventDefault();
		console.log("touchend");
		var touches = event.changedTouches;

		for (var i = 0; i < touches.length; i++) {
			var idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) {
					//myApp.stopPlayer(ongoingTouches[idx].direction);
					//ngoingTouches.splice(idx, 1);  // remove it; we're done
				myApp.canceledInputInteractions.push(myApp.inputInteractions[idx]);
		    	myApp.inputInteractions.splice(idx, 1);
		    	myApp.handleInput();
			} else {
				console.log("can't figure out which touch to end");
			}
		}
	} 

	function cancelTouch(event) {
		event.preventDefault();
		console.log("touchcancel.");
		var touches = event.changedTouches;

		for (var i = 0; i < touches.length; i++) {
				//myApp.stopPlayer(ongoingTouches[i].direction);
				//ongoingTouches.splice(i, 1);  // remove it; we're done
			myApp.canceledInputInteractions.push(myApp.inputInteractions[idx]);
		    myApp.inputInteractions.splice(i, 1);
		}
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


	//Change arrow functionality to button-like functionality
	//get rid of this hack function
	function checkTouchCollisionWithArrows(touch) {
		if (touch.direction >= 1 && touch.direction < 5) {
			console.log ("direction defined " + touch.direction);
		}
		for( var arrow in myApp.arrows){
			if (myApp.checkCollision(myApp.arrows[arrow], touch)) {
				touch.direction =myApp.arrows[arrow].direction;
			console.log("arrow: " +  myApp.arrows[arrow].x + ", " + myApp.arrows[arrow].y);
			console.log("touch: " + touch.x + ", " + touch.y);
				console.log("move da player in " + touch.direction);
				console.log("move da player in " + myApp.arrows[arrow].direction);
				myApp.movePlayer(touch.direction);
				break;
			}
			else {
				console.log("STOP "  + touch.direction);
				myApp.stopPlayer(touch.direction);
				console.log("set not moving");
				touch.direction = myApp.NOT_MOVING;
			}
		}
		return touch;
	}

	return myApp;
} (MODULE || {}));