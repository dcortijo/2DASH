import chulo from './chulo.js';

export default class Game extends Phaser.Scene {
    constructor() {
      super({ key: 'main' });
    }
    preload() {  
      this.load.image('playerImage', 'Personaje1.png');
      this.load.image('background', 'background.png');
    }
  
    create() {
      let background = this.add.image(0, 0, 'background');
      background.setOrigin(0, 0);
      background.scaleX *= 5.4;
      background.scaleY *= 4;
      this.chulo = new chulo(this, 100, 100);
      this.dKey = this.input.keyboard.addKey('D');
      this.wKey = this.input.keyboard.addKey('W');
    }
  
    update(time, delta) {    
      this.chulo.move();
    }
  }