import Personaje from './personaje.js';
import StaticObj from './StaticObj.js';

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

      this.dynamicObjs = this.physics.add.group();
      this.dynamicObjs.classType = Personaje;
      this.personaje = new Personaje(this, 100, 100, 100, 100);
      
      this.staticObjs = this.physics.add.staticGroup();
      this.staticObjs.classType = StaticObj;
      this.platform = new StaticObj(this, 400, 500, 100, 100, 'playerImage', false, false);

      this.physics.add.collider(this.staticObjs, this.dynamicObjs, onCollision);
      
    function onCollision(obj1, obj2){
      console.log("!");
    }
    }
  
    update(time, delta) {    
      this.personaje.move();
    }
  }