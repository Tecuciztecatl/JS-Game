var MODULE = (function (myApp) {
		console.log("something");

				myApp.GAME_WIDTH = 640;//window.innerWidth;
				myApp.GAME_HEIGHT = 360;//window.innerHeight;
				myApp.canvas = document.getElementById("Gamey");
				context = myApp.canvas.getContext("2d");

				myApp.canvas.width  = myApp.GAME_WIDTH;
				myApp.canvas.height = myApp.GAME_HEIGHT;

				console.log(myApp.canvas.width);
				console.log(myApp.canvas.height);
				
				myApp.gameLive = true;
				myApp.currentScreen = 'game';
				myApp.inputInteractions = new Array();

				myApp.screens = {};
				myApp.screens.game = new myApp.GameScreen(myApp.GAME_HEIGHT, myApp.GAME_WIDTH);

		var game = {
				name: 'game',
				active: false,
				update: function() {
					myApp.screens['game'].update(myApp.GAME_HEIGHT, myApp.GAME_HEIGHT);
				},
				draw: function() {
					//clear the whole canvas!
					myApp.screens['game'].draw(context, myApp.GAME_HEIGHT, myApp.GAME_WIDTH);
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

			for( var button in myApp.screen[myApp.currentScreen]){
				if (myApp.checkCollision(myApp.screen[myApp.currentScreen].buttons[button], input)) {
					myApp.screen[myApp.currentScreen].buttons[button].press();
					input.pressing = myApp.screen[myApp.currentScreen].buttons[button].name;

					console.log("button: " +  myApp.screen[myApp.currentScreen].buttons[button].x + ", " + myApp.screen[myApp.currentScreen].buttons[button].y);
					console.log("input: " + input.x + ", " + input.y);
					console.log("move da player in " + myApp.screen[myApp.currentScreen].buttons[button].name);

					return true;
				}
				else {
					return false
				}
			}
			return false;
		}

		game.step();

		return myApp;
	} (MODULE || {}));