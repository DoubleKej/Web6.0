class BulletController {
  constructor(position,direction, spriteName) {
    this.sprite = Nakama.bulletGroup.create(position.x, position.y,'assets',spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.angle = 180*(Math.atan(direction.x/-direction.y))/Math.PI;
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;
    this.sprite.body.velocity = direction.setMagnitude(BulletController.BULLET_SPEED);

    Nakama.bullets.push(this);
    this.sprite.onKilled = this.onKilled;
  }
  update(){
    if(!this.sprite.alive){
      var index = Nakama.bullets.indexOf(this);
      if (index !== -1) {
        Nakama.bullets.splice(index,1);
      }
    }
  }
}
BulletController.BULLET_SPEED = 1500;
