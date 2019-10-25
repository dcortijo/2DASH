import DynamicObj from './DynamicObj.js';
export default class Personaje extends DynamicObj{
    constructor(scene, x, y, width, height) {
      super(scene, x, y, width, height, 'playerImage', true, false, 300, 400, 300, 500, 1000);
        this.body.setCollideWorldBounds();
        this.cursors = scene.input.keyboard.addKeys('W,S,A,D');
      }

      preUpdate(){
        this.move();
      }

      move(){
          let horMovement = new Phaser.Math.Vector2(0, 0);
          if(this.cursors.D.isDown){
            if(this.body.newVelocity.x >= 0){
              horMovement.x = this.speedX;
              } else {
                horMovement.x = this.speedX + this.body.drag.x;
              }
          }
          if(this.cursors.A.isDown){
            if(this.body.newVelocity.x <= 0){
            horMovement.x = -this.speedX;
            } else {
              horMovement.x = -this.speedX - this.body.drag.x;
            }
            
          }
          this.accelerate(horMovement.x, horMovement.y);
          
          if(this.cursors.W.isDown && this.body.onFloor()){
            this.moveUp();
          }
        }
      }