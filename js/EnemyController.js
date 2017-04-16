class EnemyController {
  constructor(x,y, spriteName, configs){
    this.sprite = Nakama.enemyGroup.create(x,y,'assets',spriteName);
    this.sprite.anchor = new Phaser.Point(0.5,0.5);

    Nakama.game.physics.arcade.enable(this.sprite);
    this.configs = configs;
    this.sprite.health = this.configs.health;
    this.sprite.body.velocity.x = EnemyController.ENEMY_SPEED;
  }
  update(){
    if(this.sprite.x <110){
      this.sprite.body.velocity.x = EnemyController.ENEMY_SPEED;
    }
    if(this.sprite.x >450){
      this.sprite.body.velocity.x = -EnemyController.ENEMY_SPEED;
    }
    // this.fire();
  }
  fire(){
    this.createBullet(new Phaser.Point(0, 1));
  }
  createBullet(direction){
    new HomingBulletController(
      this.sprite.position,
      direction,
      "BulletType1.png"
    )
  }
}
EnemyController.ENEMY_SPEED =150;
