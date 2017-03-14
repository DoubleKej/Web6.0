class ShipController {
  constructor(x,y, spriteName, configs){
    this.sprite = Nakama.game.add.sprite(x,y,'assets',spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.configs = configs;
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
  }
}
ShipController.SHIP_SPEED =400;
