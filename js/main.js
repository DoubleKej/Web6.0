var Nakama = {};
Nakama.configs = {
  GAME_WIDTH : 640,
  GAME_HEIGHT: 960,
  MIN_WIDTH: 320,
  MIN_HEIGHT: 480,
  MAX_WIDTH : 640,
  MAX_HEIGHT: 960,
  PLAYER1_POS : {
    x:200,
    y:800
  },
  PLAYER2_POS : {
    x:400,
    y:800
  },
  ENEMY_POS : {
    x:100,
    y:100
  }
};

window.onload = function(){
  Nakama.game = new Phaser.Game(
    Nakama.configs.GAME_WIDTH,
    Nakama.configs.GAME_HEIGHT,
    Phaser.AUTO,
    '',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;

  Nakama.game.add.sprite(0, 0, 'background')
  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.hommingBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();
  Nakama.players = [];
  Nakama.enemies = [];
  Nakama.bullets = [];
  Nakama.players.push(
    new ShipType2Controller(
      Nakama.configs.PLAYER1_POS.x,
      Nakama.configs.PLAYER1_POS.y,
      {
        up  : Phaser.Keyboard.UP,
        down: Phaser.Keyboard.DOWN,
        left  : Phaser.Keyboard.LEFT,
        right : Phaser.Keyboard.RIGHT,
        fire  : Phaser.Keyboard.SPACEBAR,
        cooldown: 0.1
      }
    )
  );

  Nakama.players.push(
    new ShipController(
      Nakama.configs.PLAYER2_POS.x,
      Nakama.configs.PLAYER2_POS.y,
      'Spaceship1-Partner.png',
      {
        up  : Phaser.Keyboard.W,
        down: Phaser.Keyboard.S,
        left  : Phaser.Keyboard.A,
        right : Phaser.Keyboard.D,
        fire  : Phaser.Keyboard.F,
        cooldown: 0.1
      }
    )
  );
  Nakama.enemies.push(
    new EnemyController(
      Nakama.configs.ENEMY_POS.x,
      Nakama.configs.ENEMY_POS.y,
      'EnemyType1.png',

      {
        health: 150,
      }
    )
  );

  setInterval(function(){
   Nakama.enemies.push(
     new EnemyController(
       300,
       100,
       "EnemyType1.png",
       {
         speed : 500,
         health: 1500
       }
     )
   );
 }, 3000);
}

// update game state each frame
var update = function(){

  Nakama.players.forEach(function(ship){
    ship.update();
  });
  Nakama.enemies.forEach(function(enemy){
    enemy.update();
  });
  Nakama.bullets.forEach(function(bullet){
    if (bullet.update && typeof bullet.update == "function") {
      bullet.update();

    }
  });

  Nakama.game.physics.arcade.overlap(
    Nakama.bulletGroup,
    Nakama.enemyGroup,
    onBulletHitEnemy
  );

}
var onBulletHitEnemy = function(bulletSprite, enemySprite){
  enemySprite.damage(bulletSprite.damage);
  bulletSprite.kill();
}

// before camera render (mostly for debug)
var render = function(){}
