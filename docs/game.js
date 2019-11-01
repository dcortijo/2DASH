//import Personaje from './personaje.js';
import StaticObj from './StaticObj.js';
//import LevelGoal from './LevelGoal.js';
//import TriggerObj from './TriggerObj.js';
//import Collectible from './Collectible.js';
import PhysSprite from './PhysSprite.js';

export default class Game extends Phaser.Scene {
    constructor() {
      super({ key: 'main' });
    }
    preload() {  
      this.load.image('playerImage', 'Personaje1.png');
      this.load.image('background', 'background.png');
    }
  
    create() {

      // Background
      let background = this.add.image(0, 0, 'background');
      background.setOrigin(0, 0);
      background.displayWidth = 1400;
      background.displayHeight = 800;

      // World walls
      this.matter.world.setBounds(0, 0, 1400, 800);

      // Camera





      // Player
      this.player = new PhysSprite({
        scene: this, 
        x: 100, 
        y: 100, 
        w: 100, 
        h: 100, 
        gravity: true,
        static: false,
        image: 'playerImage', 
        body: {
          type:'rectangle',
          width: 40,
          height: 90}
      });

      // "plataforma"
      new PhysSprite({
        scene: this, 
        x: 100, 
        y: 500, 
        w: 100, 
        h: 100, 
        //gravity: true,
        static: true,
        image: 'playerImage', 
        body: {
          type:'rectangle',
          width: 40,
          height: 90}
      });




      this.dynamicObjs = this.matter.world.nextCategory();
      //this.personaje = new Personaje(this, 100, 100, 100, 100);
      
      this.staticObjs = this.matter.world.nextCategory();
      //new StaticObj(this, 400, 500, 100, 100, 'playerImage', false, false);

      this.triggers = this.matter.world.nextCategory();
      //new LevelGoal(this, 1200, 700, 100, 100, 'playerImage');

      //this.collectible = new Collectible(this, 200, 700, 100, 100, 'playerImage', 100);

      this.matter.world.on('collisionstart', (evento, obj1, obj2) => {
          //obj1.OnCollision(obj2);
          //obj2.OnCollision(obj1);
      });
      /*this.matter.add.overlap(triggers, dynamicObjs, (obj1, obj2) => {
        obj1.OnTrigger(obj2);
        obj2.OnTrigger(obj1);
      });*/

    }
  
    update(time, delta) {    

    }
  }