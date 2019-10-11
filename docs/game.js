import chulo from './chulo.js';

export default class Game extends Phaser.Scene {
    constructor() {
      super({ key: 'main' });
    }
    preload() {  
      this.load.image('chuloImage', 'Chulo_Original.jpg');
      this.load.image('background', 'Minecraft background.jpg');
    }
  
    create() {
      let background = this.add.image(0, 0, 'background');
      background.setOrigin(0, 0);
      background.scaleX *= 1.2;
      background.scaleY *= 1.3;
      this.chulo = new chulo(this, 100, 100);
      this.dKey = this.input.keyboard.addKey('D');
      this.wKey = this.input.keyboard.addKey('W');
    }
  
    update(time, delta) {    
      this.chulo.move();
    }
  }