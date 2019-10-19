import DynamicObj from './DynamicObj.js';
export default class Personaje extends DynamicObj{
    constructor(scene, x, y, width, height) {
      super(scene, x, y, width, height, 'playerImage', true, false, 50, 400, 100);
        this.body.setCollideWorldBounds();
        this.cursors = scene.input.keyboard.addKeys('W,S,A,D');
      }

      move(){
          let horMovement = new Phaser.Math.Vector2(0, 0);
          if(this.cursors.D.isDown){
            horMovement.x = this.speedX;
          }
          if(this.cursors.A.isDown){
            horMovement.x = -this.speedX;
          }
          this.accelerate(horMovement.x, horMovement.y);
          
          if(this.cursors.W.isDown && this.body.onFloor()){
            this.moveUp();
          }
        }
      }