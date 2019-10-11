export default class Chulo extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y,) {
        super(scene, x, y, 'chuloImage');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
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