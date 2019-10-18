import Personaje from './personaje.js';

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
      this.personaje = new Personaje(this, 100, 100, 100, 100);
    }
  
    update(time, delta) {    
      this.personaje.move();
    }
  }