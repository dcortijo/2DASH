//import LevelGoal from './LevelGoal.js';
//import Collectible from './Collectible.js';
import PhysSprite from './PhysSprite.js';
import Player from './Player.js';
import Enemy from './Enemy.js';

export default class Game extends Phaser.Scene {
    constructor() {
      super({ key: 'main' });
    }
    preload() {
      this.load.image('playerImage', 'Personaje1.png');
      this.load.image('background', 'background.png');
      this.load.tilemapTiledJSON('tilemap', 'tilemap.json');
      this.load.image('patrones', 'tileset.png');
      this.load.image('enemy1', 'DronCiudadano.png');
    }

    create() {
      // Background
      let background = this.add.image(-100, 0, 'background');
      background.setOrigin(0, 0);
      background.displayWidth = 14100;
      background.displayHeight = 800;

      //Tilemap
      this.map = this.make.tilemap({ 
        key: 'tilemap', 
        tileWidth: 64, 
        tileHeight: 64,
      });
      this.map.addTilesetImage('tileset', 'patrones');
      this.layer = this.map.createStaticLayer('layer', 'tileset');
      this.layer.setCollisionBetween(0, 999);
      this.matter.world.convertTilemapLayer(this.layer);

      // World walls
      this.matter.world.setBounds(-100, 0, 14000, 800);

      // Player
        // Body
        let playerPartA = Phaser.Physics.Matter.Matter.Bodies.circle(90, 145, 21);
        let playerPartB = Phaser.Physics.Matter.Matter.Bodies.rectangle(90, 110, 40, 70);
        let playerSensorFeet = Phaser.Physics.Matter.Matter.Bodies.rectangle(90, 170, 30, 20, {isSensor: true, label: 'sensor'});
      this.player = new Player({
        scene: this,
        x: 100,
        y: 100,
        w: 100,
        h: 100,
        hasGravity: true,
        isStatic: false,
        image: 'playerImage',
        body: {
          parts: [playerPartA, playerPartB, playerSensorFeet],
          inertia: Infinity
        },
        jumpStrength: 10,
        acceleration: 0.12,
        drag: 0.05,
        maxSpeedX: 20,
        mass: 70,
        restitution: 0,
        label: 'player'
      });

      // Camera
      this.cam = this.cameras.main;
      this.cam.setBounds(-100, 0, 14000, 800);
      this.cam.startFollow(this.player);

      // "plataforma"
        // Body
        let plat = Phaser.Physics.Matter.Matter.Bodies.rectangle(1000, 750, 2000, 30, {label: 'plataforma'});
      new PhysSprite({
        scene: this,
        x: 100,
        y: 600,
        w: 100,
        h: 100,
        image: 'playerImage',
        body: {
          parts: [plat],
          inertia: Infinity},
        isStatic: true,
        label: 'platform'
      });

      // "plataforma2"
        // Body
        let plat2 = Phaser.Physics.Matter.Matter.Bodies.rectangle(800, 700, 2000, 30, {label: 'plataforma'});
      new PhysSprite({
        scene: this,
        x: 100,
        y: 600,
        w: 100,
        h: 100,
        image: 'playerImage',
        body: {
          parts: [plat2],
          inertia: Infinity},
        isStatic: true,
        label: 'platform'
      });

      // "trigger"
        // Body
        let trigger = Phaser.Physics.Matter.Matter.Bodies.circle(800, 600, 30,{isSensor: true, label: 'trigger'});
      new PhysSprite({
        scene: this,
        x: 800,
        y: 600,
        //w: 100,
        //h: 100,
        hasGravity: false,
        //image: 'playerImage',
        body: {
          parts: [trigger],
          inertia: Infinity},
          label: 'trigger'
      });

      //Enemy
        // Body
        let enemy = Phaser.Physics.Matter.Matter.Bodies.rectangle(700, 600, 70, 60);
        let enemyTop = Phaser.Physics.Matter.Matter.Bodies.rectangle(700, 570, 60, 20, {isSensor: true});
      new Enemy({
        scene: this,
        x: 50,
        y: 600,
        w: 100,
        h: 100,
        hasGravity: false,
        image: 'enemy1',
        body: {
          parts: [enemy, enemyTop],
          inertia: Infinity},
        label: 'enemy'
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
          if(obj1.gameObject && obj1.gameObject.OnCollisionStart)obj1.gameObject.OnCollisionStart(obj1, obj2, evento);
          if(obj2.gameObject && obj2.gameObject.OnCollisionStart)obj2.gameObject.OnCollisionStart(obj2, obj1, evento);
        }else{
          if(obj1.gameObject && obj1.gameObject.OnTriggerStart)obj1.gameObject.OnTriggerStart(obj1, obj2);
          if(obj2.gameObject && obj2.gameObject.OnTriggerStart)obj2.gameObject.OnTriggerStart(obj2, obj1);
        }
      });

      this.matter.world.on('collisionend', (evento, obj1, obj2) => {
        if(!obj1.isSensor && !obj2.isSensor){
          if(obj1.gameObject && obj1.gameObject.OnCollisionEnd)obj1.gameObject.OnCollisionEnd(obj1, obj2, evento);
          if(obj2.gameObject && obj2.gameObject.OnCollisionEnd)obj2.gameObject.OnCollisionEnd(obj2, obj1, evento);
        }else{
          if(obj1.gameObject && obj1.gameObject.OnTriggerEnd)obj1.gameObject.OnTriggerEnd(obj1, obj2);
          if(obj2.gameObject && obj2.gameObject.OnTriggerEnd)obj2.gameObject.OnTriggerEnd(obj2, obj1);
        }
      });

      this.matter.world.on('collisionactive', (evento) => {
        for(let i = 0; i < evento.pairs.length; i++){
            let obj1 = evento.pairs[i].bodyA;
            let obj2 = evento.pairs[i].bodyB;
          if(!obj1.isSensor && !obj2.isSensor){
           if(obj1.gameObject && obj1.gameObject.OnCollisionStay)obj1.gameObject.OnCollisionStay(obj1, obj2, evento);
           if(obj2.gameObject && obj2.gameObject.OnCollisionStay)obj2.gameObject.OnCollisionStay(obj2, obj1, evento);
          }else{
           if(obj1.gameObject && obj1.gameObject.OnTriggerStay)obj1.gameObject.OnTriggerStay(obj1, obj2);
           if(obj2.gameObject && obj2.gameObject.OnTriggerStay)obj2.gameObject.OnTriggerStay(obj2, obj1);
          }
        }
      });
    }

    update(time, delta) {

    }
  }