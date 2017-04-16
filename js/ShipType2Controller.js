class ShipType2Controller extends ShipController {
  constructor(x, y, configs) {
    super(x, y, ShipType2Controller.SPRITE_NAME, configs);
    this.sprite.body.velocity = this.sprite.body.velocity.setMagnitude(ShipType2Controller.BULLET_SPEED);
  }
  update(){
    super.update();
  }

  fire(){
    this.createBullet(new Phaser.Point(0, -1));
  }
  createBullet(direction){
    new BulletType2Controller(
      this.sprite.position,
      direction
    )
  }
}

ShipType2Controller.SPRITE_NAME = "Spaceship2-Player.png";
ShipType2Controller.SHIP_SPEED = 200;
