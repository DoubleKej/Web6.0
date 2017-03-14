class EnemyController {
  constructor(x,y, spriteName, configs){
    this.sprite = Nakama.game.add.sprite(x,y,'assets',spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.configs = configs;
    this.sprite.body.velocity.x = EnemyController.ENEMY_SPEED;
  }
  update(){
    if(this.sprite.x <110){
      this.sprite.body.velocity.x = EnemyController.ENEMY_SPEED;
    }
    if(this.sprite.x >450){
      this.sprite.body.velocity.x = -EnemyController.ENEMY_SPEED;
    }

  }
}
EnemyController.ENEMY_SPEED =50;
