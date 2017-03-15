class BulletController {
  constructor(position,direction, spriteName) {
    this.sprite = Nakama.bulletGroup.create(position.x, position.y,'assets',spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.angle = 180*(Math.atan(direction.x/-direction.y))/Math.PI;
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    this.sprite.body.checkWolrdBounds = true;
    this.sprite.body.outOfBoundsKill = true;
    this.sprite.body.velocity = direction.setMagnitude(BulletController.BULLET_SPEED);
  }
}
BulletController.BULLET_SPEED = 1000;
