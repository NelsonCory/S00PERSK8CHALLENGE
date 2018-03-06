/*
	Programmer: Cory Nelson
	Artist: Hannah Owens
	Musician: Andrew Scott
		
	State Info: First Game Level
*/

var firstLevel = {
	
	preload: function(){
	//load assets
	game.load.spritesheet("radDude", "assets/radSheet.png", 157,240);
	game.load.tilemap("mapTiles", "assets/level1.json",null, Phaser.Tilemap.TILED_JSON);
	game.load.image("tileSheet","assets/tempTiles.png");
	game.load.image("sky", "assets/sky.png");
	game.load.audio("levelSong1", "audio/levelsong1.wav");
	},
	
	create: function(){
		
		
		skyPicture = game.add.sprite(0,0,"sky");
		skyPicture.scale.setTo(1.75,1.5);
		skyPicture.fixedToCamera = true;
		
		
		//physics
		game.physics.startSystem(Phaser.Physics.NINJA);
		game.physics.ninja.gravity = 0.75;
		
		//create map
		map = game.add.tilemap("mapTiles");
		map.addTilesetImage("grass","tileSheet",200,200);
		mainLayer = map.createLayer("mainLayer");
		mainLayer.resizeWorld();
		var slopeMap = [0,1,1,1,1,2,6,26,1,3,1,23,17,1,15,19,1,1,1,18,14,1,0,0];
		tiles = game.physics.ninja.convertTilemap(map,mainLayer,slopeMap);
		map.setCollisionBetween(1,21);
		
		//create player
		player = game.add.sprite(100, 0, "radDude");
		game.physics.ninja.enable(player);
		player.animations.add("moveRight", [6,7,8],8,true);
		player.animations.add("moveLeft", [6,7,8],5,true);
		//player.animations.add("jump", [3,4,5,6], 5, true);
		player.body.bounce = 0.09;
		player.body.drag = 1;
		
	
		
		game.camera.follow(player);
		
		cursors = game.input.keyboard.createCursorKeys();
		
		
		//add music, loop	
		levelSong1 = game.add.audio("levelSong1",1,true);
		levelSong1.play();
		
		
	},
	
	update: function(){
	
		//PLAYER COLLISIONS
		for(var i = 0; i < tiles.length; i++)
		{
			player.body.aabb.collideAABBVsTile(tiles[i].tile);
		}
		
		/*
		//movement
		if(cursors.right.isDown){
			player.body.moveRight(50);
			player.animations.play("moveRight");
		}
		else if (cursors.left.isDown){
			player.body.moveLeft(50);	
			player.animations.play("moveLeft");
		}
		else{
			player.animations.stop();
			if(player.body.touching.down){
				player.frame = 1;
			}
			else{
				player.frame = 3;
				
			}
		}
		//jump
		if(cursors.up.isDown && player.body.touching.down){
			player.body.y -= 20;
		}
		*/
		
		
		if(cursors.right.isDown && player.body.touching.down){
			player.body.moveRight(50);
			player.animations.play("moveRight");
		}
		else if (cursors.right.isDown && !player.body.touching.down){
			player.body.moveRight(50);
			player.animations.stop();
			player.frame = 3;
		}
		else if (cursors.left.isDown && player.body.touching.down){
			player.body.moveLeft(50);
			player.animations.play("moveLeft");
		}
		else if (cursors.left.isDown && !player.body.touching.down){
			player.body.moveLeft(50);
			player.animations.stop();
			player.frame = 3;
		}else{
			player.animations.stop();
			if(player.body.touching.down){
				player.frame = 1;
			}
			else{
				player.frame = 3;
			}
		}
		
		if(cursors.up.isDown && player.body.touching.down){
			player.body.y -= 20;	
		}
		
	},
	
	
	
};