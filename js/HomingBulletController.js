class HomingBulletController {
  constructor(position,direction, spriteName) {
    this.sprite = Nakama.hommingBulletGroup.create(position.x, position.y,'assets',spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    this.sprite.body.checkWolrdBounds = true;
    this.sprite.body.outOfBoundsKill = true;
    this.sprite.body.velocity = direction.setMagnitude(HomingBulletController.BULLET_SPEED);
  }
  update(){
    if(this.focus && this.focus.alive){
          this.sprite.angle = 180*Math.atan((this.focus.x-this.sprite.x)/-(this.focus.y-this.sprite.y))/Math.PI;
          var dir = new Phaser.Point (this.focus.x-this.sprite.x,this.focus.y-this.sprite.y);
          this.sprite.body.velocity = dir.setMagnitude(BulletController.BULLET_SPEED);
        }
  }
}
HomingBulletController.BULLET_SPEED = 1000;
