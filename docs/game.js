import Personaje from './personaje.js';
import StaticObj from './StaticObj.js';
import LevelGoal from './LevelGoal.js';
import TriggerObj from './TriggerObj.js';

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
      new StaticObj(this, 400, 500, 100, 100, 'playerImage', false, false);

      this.triggers = this.physics.add.staticGroup();
      this.triggers.classType = TriggerObj;
      new LevelGoal(this, 1200, 700, 100, 100, 'playerImage');

      this.physics.add.collider(this.staticObjs, this.dynamicObjs, (obj1, obj2) => {
        obj1.OnCollision(obj2);
        obj2.OnCollision(obj1);
      });
      this.physics.add.overlap(this.triggers, this.dynamicObjs, (obj1, obj2) => {
        obj1.OnTrigger(obj2);
        obj2.OnTrigger(obj1);
      });
    }
  
    update(time, delta) {    
    }
  }