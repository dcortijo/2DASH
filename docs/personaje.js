import SpriteSize from './SpriteSize.js';
export default class Personaje extends SpriteSize{
    constructor(scene, x, y, width, height) {
      super(scene, x, y, width, height, 'playerImage');


        this.body.setCollideWorldBounds();
        this.cursors = scene.input.keyboard.addKeys('W,S,A,D');
      }

      move(){
          if(this.cursors.D.isDown){
            this.x = this.x + 5;
          }
          if(this.cursors.A.isDown){
            this.x = this.x - 5;
          }
          if(this.cursors.W.isDown && this.body.onFloor()){
            this.body.setVelocityY(-400);
          }
        }
      }