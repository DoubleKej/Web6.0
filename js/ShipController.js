class ShipController {
  constructor(x,y, spriteName, configs){
    this.sprite = Nakama.playerGroup.create(x,y,'assets',spriteName);

    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    this.sprite.body.collideWolrdBounds = true;
    this.configs = configs;
    this.timeSinceLastFire = 0;
  }
  update(){
    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -ShipController.SHIP_SPEED;
      if(this.sprite.y <0){this.sprite.y=0;}
    } else
    if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = ShipController.SHIP_SPEED;
      if(this.sprite.y >880){this.sprite.y=880;}
    } else {
      this.sprite.body.velocity.y = 0;
    }
    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -ShipController.SHIP_SPEED;
      if(this.sprite.x <110){this.sprite.x=110;}
    } else
    if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = ShipController.SHIP_SPEED;
      if(this.sprite.x >450){this.sprite.x=450;}
    }
    else {
      this.sprite.body.velocity.x = 0;
    }

    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    if(Nakama.keyboard.isDown(this.configs.fire)){
      this.tryFire();
    }
  }
  tryFire(){
    if (this.timeSinceLastFire >= this.configs.cooldown) {
      this.fire();
      this.timeSinceLastFire = 0;
    }
  }
  fire(){
    this.createBullet(new Phaser.Point(0, -1));
    this.createBullet(new Phaser.Point(1, -5));
    this.createBullet(new Phaser.Point(-1, -5));
    this.createBullet(new Phaser.Point(1, -2));
    this.createBullet(new Phaser.Point(-1, -2));

  }
  createBullet(direction){
    new BulletType2Controller(
      this.sprite.position,
      direction
    )
  }
}
ShipController.SHIP_SPEED =400;
