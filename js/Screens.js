var MODULE = (function (myApp) {
	
	// Game has different screens and each screen has different controls!
	// I'll follow this logic to achieve my purpose!

	myApp.GameScreen = function (GAME_HEIGHT, GAME_WIDTH) {

		var entities = [
			{
				x: GAME_WIDTH - 50,
				y: (GAME_HEIGHT/2)-35,
				w: 50,
				h: 70,
				colour: "rgb(150,120,20)"
		    }
	    ];

		var goal = {
			x: GAME_WIDTH - 20,
			y: (GAME_HEIGHT/2)-25,
			w: 20,
			h: 50,
			colour: "rgb(0,100,200)"
		};

		var enemies = [
			{
				x: 100, //x coordinate
				y: 100, //y coordinate
				speedY: 1, //speed in Y
				w: 40, //width
				h: 40, //heght
			    colour: "#3333FF"
			},
			{
				x: 260,
				y: 100,
				speedY: 2,
				w: 40,
				h: 40,
			    colour: "#3333FF"
			},
			{
				x: 380,
			  	y: 100,
			  	speedY: 3,
			  	w: 40,
			  	h: 40,
			    colour: "#3333FF"
			},
			{
			  	x: 450,
			  	y: 100,
			  	speedY: 7,
			  	w: 40,
			  	h: 40,
			    colour: "#3333FF"
			}
		];

		var player = {	
			x: 10,
			y: (GAME_HEIGHT/2)-25,
			w: 10,
			h: 50,
			colour: "rgb(10,10,10)",
			speed: 2
		};

		console.log(myApp.GAME_HEIGHT);
		console.log(goal);

		var movePlayer = function(direction) {
			if (myApp.gameLive) {
				if (direction == myApp.DIRECTION_LEFT) {
					if (player.x - player.speed >= 0)
						player.x -= player.speed;
					else
						player.x = 0;
				}
				else if (direction == myApp.DIRECTION_RIGHT) {
					if (player.x + player.w + player.speed <= GAME_WIDTH)
						player.x += player.speed;
					else
						player.x = GAME_WIDTH - player.w;
				}
				else if (direction == myApp.DIRECTION_UP) {
					if (player.y - player.speed >= 0)
						player.y -= player.speed;
					else
						player.y = 0;
				}
				else if (direction == myApp.DIRECTION_DOWN) {
					if (player.y + player.h + player.speed <= GAME_HEIGHT)
						player.y += player.speed;
					else
						player.y = GAME_HEIGHT - player.h;
				}
			}
		}

		var buttons = {
			left: {
				name: 'left',
				x: 90,
				y: 100,
				h: 10,
				w: 10,
				colour: "rgb(255,0,0)",
				isPressed: false,
				direction: myApp.DIRECTION_LEFT,
				press: function() {
					buttons.right.isPressed = false;
					this.isPressed = true;
				},
				released: function() {
					this.isPressed = false;
				},
				doOnPress: function() {
					movePlayer(this.direction);
				}
			},
			right: {
				name: 'right',
				x: 100,
				y: 100,
				h: 10,
				w: 10,
				colour: "rgb(255,255,0)",
				isPressed: false,
				direction: myApp.DIRECTION_RIGHT,
				press: function() {
					buttons.left.isPressed = false;
					this.isPressed = true;
				},
				released: function() {
					this.isPressed = false;
				},
				doOnPress: function() {
					movePlayer(this.direction);
				}
			},
			up: {
				name: 'up',
				x: 10,
				y: 100,
				h: 10,
				w: 10,
				colour: "rgb(0,0,255)",
				isPressed: false,
				direction: myApp.DIRECTION_UP,
				press: function() {
					buttons.down.isPressed = false;
					this.isPressed = true;
				},
				released: function() {
					this.isPressed = false;
				},
				doOnPress: function() {
					movePlayer(this.direction);
				}
			},
			down: {
				name: 'down',
				x: 10,
				y: 150,
				h: 10,
				w: 10,
				colour: "rgb(0,255,255)",
				isPressed: false,
				direction: myApp.DIRECTION_DOWN,
				press: function() {
					buttons.up.isPressed = false;
					this.isPressed = true;
				},
				released: function() {
					this.isPressed = false;
				},
				doOnPress: function() {
					movePlayer(this.direction);
				}
			}
		};




		var game = {
			name: 'game',
			height: GAME_HEIGHT,
			width: GAME_WIDTH,
			isActive: false,
			entities: entities,
			goal: goal,
			enemies: enemies,
			player: player,
			buttons: buttons,
			moveEnemies: function(hLimit) {
				game.enemies.forEach(function(enemy){

				  //check for collision with player
				  if(myApp.checkCollision(player, enemy)) {
				    // PROBS return something
				    //stop the game
			    	myApp.gameLive = false;

				    alert('Game Over');

				    //reload
				    window.location = "";
				  }

				  //move enemy
				  enemy.y += enemy.speedY;
				  
				  //check borders
				  if(enemy.y < 1) {
				    enemy.y = 1;
				    //element.speedY = element.speedY * -1;
				    enemy.speedY *= -1;
				  }
				  else if(enemy.y >= hLimit - 50) {
				    enemy.y = hLimit - 50;
				    enemy.speedY *= -1;
				  }
				});
			},
			movePlayer: movePlayer(),
			update: function(height, width) {
				if (myApp.gameLive) {
					if (myApp.checkCollision(player, goal)) {
						//stop the game
		            	myApp.gameLive = false;

		            	alert('Game WON!');

		            	//reload
		            	window.location = "";
					}
					game.moveEnemies(myApp.GAME_HEIGHT);
					//if (player.isMoving)
					//movePlayer(height, width);
					for (var button in buttons) {
						//if(myApp.checkCollision)
						if (buttons[button].isPressed)
							buttons[button].doOnPress();
					}
				}
			},
			draw: function(context, height, width) {
				context.clearRect(0,0,width, height);
				game.entities.forEach(
					function(entity) {
						context.fillStyle = entity.colour;
						context.fillRect(entity.x, entity.y, entity.w, entity.h);
					}
				);
				
				context.fillStyle = goal.colour;
				context.fillRect(goal.x, goal.y, goal.w, goal.h);

				game.enemies.forEach(
					function(enemy) {
						context.fillStyle = enemy.colour;
						context.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
					}
				);
				
				context.fillStyle = game.player.colour;
				context.fillRect(game.player.x, game.player.y, game.player.w, game.player.h);

				for (var button in buttons) {
					context.fillStyle = buttons[button].colour;
					context.fillRect(buttons[button].x, buttons[button].y, buttons[button].w, buttons[button].h);
				}
			}
		};


		return game;
	};

	return myApp;
} (MODULE || {}));