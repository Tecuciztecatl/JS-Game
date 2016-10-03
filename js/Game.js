var MODULE = (function (myApp) {
		console.log("something");

				myApp.GAME_WIDTH = 640;//window.innerWidth;
				myApp.GAME_HEIGHT = 360;//window.innerHeight;
				myApp.canvas = document.getElementById("Gamey");
				context = myApp.canvas.getContext("2d");

				myApp.canvas.width  = myApp.GAME_WIDTH;
				myApp.canvas.height = myApp.GAME_HEIGHT;

		myApp.DIRECTION_LEFT = 1;
		myApp.DIRECTION_UP = 2;
		myApp.DIRECTION_RIGHT = 3;
		myApp.DIRECTION_DOWN = 4;
		myApp.NOT_MOVING = 5;


				myApp.LEFT = 'left';
				myApp.UP = 'up';
				myApp.RIGHT = 'right';
				myApp.DOWN = 'down';
				myApp.MENU = 'menu';

				console.log(myApp.canvas.width);
				console.log(myApp.canvas.height);
				
				myApp.gameLive = true;
				myApp.pause = function () {
					myApp.gameLive = false;
				}
				myApp.resume = function () {
					myApp.gameLive = true;
				}
				myApp.currentScreen = 'game';
				myApp.inputInteractions = new Array();
				myApp.canceledInputInteractions = new Array();

				myApp.screens = {};
				myApp.screens.game = new myApp.GameScreen(myApp.GAME_HEIGHT, myApp.GAME_WIDTH);

		var game = {
				name: 'game',
				active: false,
				update: function() {
					//handleButtons();
					myApp.screens[myApp.currentScreen].update(myApp.GAME_HEIGHT, myApp.GAME_HEIGHT);
				},
				draw: function() {
					//clear the whole canvas!
					myApp.screens[myApp.currentScreen].draw(context, myApp.GAME_HEIGHT, myApp.GAME_WIDTH);
				},

			};

		var Step = function() {
						game.update();
						game.draw(); //draw cleans as well.
					//recall the step
					window.requestAnimationFrame(function() {
						Step();
					});
				};
		game.step = Step;
			console.log(game);
		//check collision
		myApp.checkCollision = function(rect1, rect2) {
			var closeOnWidth;
			var closeOnHeight;

			if (rect1.x < rect2.x)
				closeOnWidth = Math.abs(rect1.x - rect2.x) <= rect1.w;
			else
				closeOnWidth = Math.abs(rect1.x - rect2.x) <= rect2.w;

			if (rect1.y < rect2.y)
				closeOnHeight = Math.abs(rect1.y - rect2.y) <= rect1.h;
			else
				closeOnHeight = Math.abs(rect1.y - rect2.y) <= rect2.h;

			return closeOnHeight && closeOnWidth;
		};


		myApp.checkInputCollisionWithButtons = function (input) {
			for( var button in myApp.screens[myApp.currentScreen].buttons){
				//console.log ("button: " + JSON.stringify(myApp.screens[myApp.currentScreen].buttons[button]));
				if (myApp.checkCollision(myApp.screens[myApp.currentScreen].buttons[button], input)) {
					myApp.screens[myApp.currentScreen].buttons[button].press();
					input.pressed = myApp.screens[myApp.currentScreen].buttons[button].name;
					input.isPressing = true;

					//console.log("button: " +  myApp.screens[myApp.currentScreen].buttons[button].x + ", " + myApp.screens[myApp.currentScreen].buttons[button].y);
					//console.log("input: " + input.x + ", " + input.y);
					//console.log("move da player in " + myApp.screens[myApp.currentScreen].buttons[button].name);

					return input;
				}
			}
			input.pressed = null;
			input.isPressing = false;
			return input;
		}

		myApp.handleInput = function() {
			for (var i = 0; i < myApp.inputInteractions.length; i++) {
				console.log("II " + JSON.stringify(myApp.inputInteractions[i]));
				if (myApp.inputInteractions[i].isPressing) {
					if (!myApp.checkCollision(myApp.inputInteractions[i], myApp.screens[myApp.currentScreen].buttons[myApp.inputInteractions[i].pressed])) {
						myApp.screens[myApp.currentScreen].buttons[myApp.inputInteractions[i].pressed].release();
						myApp.inputInteractions[i].isPressing = false;
						myApp.inputInteractions[i].pressed = null;
					}
				}
				else {
					myApp.inputInteractions[i] = myApp.checkInputCollisionWithButtons(myApp.inputInteractions[i]);
					if (myApp.inputInteractions[i].isPressing) {
						myApp.screens[myApp.currentScreen].buttons[myApp.inputInteractions[i].pressed].press();
					}

				}
			}
			// handle canceledInputInteractions
			for (var i = 0; i < myApp.canceledInputInteractions.length; i++) {
				console.log("II " + JSON.stringify(myApp.canceledInputInteractions[i]));
				if (myApp.canceledInputInteractions[i].isPressing) {
					myApp.screens[myApp.currentScreen].buttons[myApp.canceledInputInteractions[i].pressed].release();
					myApp.screens[myApp.currentScreen].buttons[myApp.canceledInputInteractions[i].pressed].doOnRelease();
						myApp.canceledInputInteractions.splice(i, 1);
				}
			}
		}

		myApp.press = function(button) {
			myApp.screens[myApp.currentScreen].buttons[button].press();
		}

		myApp.release = function(button) {
			myApp.screens[myApp.currentScreen].buttons[button].release();
			myApp.screens[myApp.currentScreen].buttons[button].doOnRelease();
		}

		game.step();

		return myApp;
	} (MODULE || {}));