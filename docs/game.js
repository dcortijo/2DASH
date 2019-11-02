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





      // "player"
      this.player = new PhysSprite({
        scene: this, 
        x: 100, 
        y: 100, 
        w: 100, 
        h: 100, 
        hasGravity: true,
        isStatic: false,
        image: 'playerImage', 
        body: {
          type:'rectangle',
          width: 40,
          height: 90},
        //isSensor: false
      });

      // "plataforma"
      new PhysSprite({
        scene: this, 
        x: 100, 
        y: 600, 
        w: 100, 
        h: 100, 
        //hasGravity: true,
        isStatic: true,
        image: 'playerImage', 
        body: {
          label: 'aa',
          type:'rectangle',
          width: 100,
          height: 40},
        //isSensor: false
      });

      // "trigger"
      new PhysSprite({
        scene: this, 
        x: 100, 
        y: 350, 
        //w: 100, 
        //h: 100, 
        hasGravity: false,
        isStatic: true,
        //image: 'playerImage', 
        body: {
          type:'rectangle',
          width: 150,
          height: 90},
        isSensor: true
      });




      this.dynamicObjs = this.matter.world.nextCategory();
      //this.personaje = new Personaje(this, 100, 100, 100, 100);
      
      this.staticObjs = this.matter.world.nextCategory();
      //new StaticObj(this, 400, 500, 100, 100, 'playerImage', false, false);

      this.triggers = this.matter.world.nextCategory();
      //new LevelGoal(this, 1200, 700, 100, 100, 'playerImage');

      //this.collectible = new Collectible(this, 200, 700, 100, 100, 'playerImage', 100);

      this.matter.world.on('collisionstart', (evento, obj1, obj2) => {
        if(!obj1.isSensor && !obj2.isSensor){
          obj1.gameObject.OnCollision(obj2);
          obj2.gameObject.OnCollision(obj1);
        }else{
            obj1.gameObject.OnTrigger(obj2);
            obj2.gameObject.OnTrigger(obj1);
        }
      });
    }
  
    update(time, delta) {    

    }
  }