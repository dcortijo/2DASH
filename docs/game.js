import Collectible from './Collectible.js';
import PhysSprite from './PhysSprite.js';
import Player from './Player.js';
import Enemy from './Enemy.js';
import PlayerCamera from './PlayerCamera.js';
import LevelGoal from './LevelGoal.js';
import HealthMeter from './HealthMeter.js';
import DeadZone from './DeadZone.js';
import BrokenGlass from './BrokenGlass.js';
import Whip from './Whip.js';
import DronCiudadano from './DronCiudadano.js';
import Boba from './Boba.js';

export default class Game extends Phaser.Scene {
    constructor() {
      super({ key: 'main' });
    }
    preload() {
      this.load.image('playerImage', 'Personaje1.png');
      this.load.image('background', 'background.png');
      this.load.image('patrones', 'TilesetFirst.png');
      this.load.image('dronCiudadano', 'DronCiudadano.png');
      this.load.image('boba', 'Boba.png');
      this.load.tilemapTiledJSON('Nivel1', 'Nivel1.json');
      this.load.image('patrones', 'TilesetFirst.png');
      this.load.image('collectible', 'Collectible.png');
      this.load.spritesheet('healthMeter1', 'Heart1.png', {
        frameWidth: 64,
        frameHeight: 32,
      });
      this.load.spritesheet('whipS', 'WhipSheet.png', {frameWidth: 96, frameHeight: 32});
      this.load.spritesheet('playerRun', 'MachFoxRunSheet.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {
      // Background
      let background = this.add.image(-100, 0, 'background');
      background.setOrigin(0, 0);
      background.displayWidth = 32000;
      background.displayHeight = 3200;

      this.collisionLayers = {
        player: this.matter.world.nextCategory(),
        enemy: this.matter.world.nextCategory(),
        collectible: this.matter.world.nextCategory(),
        whip: this.matter.world.nextCategory(),
        obstacle: this.matter.world.nextCategory(),
        levelGoal: this.matter.world.nextCategory(),
        deadZone: this.matter.world.nextCategory(),
        triggers: this.matter.world.nextCategory(),
      };

      //Animaciones
      this.anims.create({
        key: 'runRight',
        frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'runLeft',
        frames: this.anims.generateFrameNumbers('playerRun', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'whip',
        frames: this.anims.generateFrameNumbers('whipS', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: 0
      });

      //Tilemap
      this.map = this.make.tilemap({ 
        key: 'Nivel1', 
        tileWidth: 64, 
        tileHeight: 64,
      });
      this.map.addTilesetImage('tileset1', 'patrones');
      this.layer = this.map.createStaticLayer('layer', 'tileset1');
      let objectLayers = this.map.objects;

      // Object layers
      for(let i = 0; i < objectLayers[4].objects.length; i++){
        this.CreatePlatform(objectLayers[4].objects[i].x, objectLayers[4].objects[i].y, objectLayers[4].objects[i].width, objectLayers[4].objects[i].height);
      }
      this.CreatePlayer(objectLayers[3].objects[0].x, objectLayers[3].objects[0].y);
      for(let i = 0; i < objectLayers[2].objects.length; i++){     
          this.CreateColectible(objectLayers[2].objects[i].x, objectLayers[2].objects[i].y);
      }
      for(let i = 0; i < objectLayers[1].objects.length; i++){     
        this.CreateEnemy(objectLayers[1].objects[i].x, objectLayers[1].objects[i].y);
      }
      for(let i = 0; i < objectLayers[0].objects.length; i++){     
          this.CreateBrokenGlass(objectLayers[0].objects[i].x, objectLayers[0].objects[i].y);
      }
      
      this.matter.world.convertTilemapLayer(this.layer);

      //Score
      this.score = 0;
      this.scoreText = this.add.text(70, 55, "SCORE: " + this.score, {fill: "#ffffff"}).setFontSize(40);
      this.scoreText.setScrollFactor(0);

      //Timer
      this.timeNum = 0;
      this.timerText = this.add.text(1200, 55, "TIME: " + (Math.round(this.timeNum/1000)), {fill: "#ffffff"}).setFontSize(40);
      this.timerText.setScrollFactor(0);

      // World walls
      this.matter.world.setBounds(0, 0, 32000, 3250);

      // Player
      //this.CreatePlayer(100, 100);

      // Camera
        // Remove default camera
        this.cameras.remove(this.cameras.main);
      let cam = new PlayerCamera({
        x: 0,
        y: 0,
        width: 1440,
        height: 810,
        bounds: { x: 0, y: 0, width: 32000, height: 3200 },
        target: this.player,
        maxOffsetX: 400,
        offsetY: 200,
        repositionSpeed: 5
      });
      this.cameras.addExisting(cam, true);


















      // Collectible
      this.CreateBigColectible(300, 600);

      //DronCiudadano
      this.CreateDronCiudadano(500, 200, [this.CreateTrigger(350, 150, 30, 30), this.CreateTrigger(650, 250, 30, 30), this.CreateTrigger(400, 400, 30, 30)]);

      //Boba
      this.CreateBoba(900, 200, [this.CreateTrigger(750, 200, 30, 30), this.CreateTrigger(1050, 200, 30, 30)]);

      //Platform
      this.CreatePlatform(900, 240, 700, 30);

      //Platform
      this.CreatePlatform(1500, 600, 3000, 30);

      //levelGoal
      this.CreateLevelGoal(3000, 600);

      //DeadZone
      this.CreateDeadZone(1800, 3200, 20000, 30);

      // BrokenGlass
      this.CreateBrokenGlass(1700, 575);




















      // Inicio de colisiones
      this.matter.world.on('collisionstart', (evento, obj1, obj2) => {
        if(!obj1.isSensor && !obj2.isSensor){
          if(obj1.gameObject && obj1.gameObject.OnCollisionStart)obj1.gameObject.OnCollisionStart(obj1, obj2, evento);
          if(obj2.gameObject && obj2.gameObject.OnCollisionStart)obj2.gameObject.OnCollisionStart(obj2, obj1, evento);
        }else{
          if(obj1.gameObject && obj1.gameObject.OnTriggerStart)obj1.gameObject.OnTriggerStart(obj1, obj2);
          if(obj2.gameObject && obj2.gameObject.OnTriggerStart)obj2.gameObject.OnTriggerStart(obj2, obj1);
        }
      });

      // Fin de colisiones
      this.matter.world.on('collisionend', (evento, obj1, obj2) => {
        if(!obj1.isSensor && !obj2.isSensor){
          if(obj1.gameObject && obj1.gameObject.OnCollisionEnd)obj1.gameObject.OnCollisionEnd(obj1, obj2, evento);
          if(obj2.gameObject && obj2.gameObject.OnCollisionEnd)obj2.gameObject.OnCollisionEnd(obj2, obj1, evento);
        }else{
          if(obj1.gameObject && obj1.gameObject.OnTriggerEnd)obj1.gameObject.OnTriggerEnd(obj1, obj2);
          if(obj2.gameObject && obj2.gameObject.OnTriggerEnd)obj2.gameObject.OnTriggerEnd(obj2, obj1);
        }
      });

      // Durante colisiones
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

  CreateDeadZone(x, y, w, h) {
    let deadZoneBody = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, w, h, { isSensor: true });
    let deadZone = new DeadZone({
      scene: this,
      x: x,
      y: y,
      w: w,
      h: h,
      hasGravity: false,
      body: {
        parts: [deadZoneBody],
        inertia: Infinity
      },
      label: 'deadzone'
    });
    deadZone.setCollisionCategory(this.collisionLayers.deadZone);
    deadZone.setCollidesWith(this.collisionLayers.player);
    return deadZone;
  }

    CreateColectible(x, y){
      let collectible = new Collectible({
        scene: this,
        x: x,
        y: y,
        w: 32,
        h: 32,
        hasGravity: false,
        image: 'collectible',
        score: 10,
        body: {
          parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 32, 32, {isSensor: true})],
          inertia: Infinity},
          label: 'collectible'
      });
      collectible.setCollisionCategory(this.collisionLayers.collectible);
      collectible.setCollidesWith([this.collisionLayers.player]);
      return collectible;
    }

    CreateBigColectible(x, y){
      let collectible = new Collectible({
        scene: this,
        x: x,
        y: y,
        w: 96,
        h: 96,
        hasGravity: false,
        image: 'collectible',
        score: 50,
        body: {
          parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 96, 96, {isSensor: true})],
          inertia: Infinity},
          label: 'collectible'
      });     
      collectible.setCollisionCategory(this.collisionLayers.collectible);
      collectible.setCollidesWith([this.collisionLayers.player]);
      return collectible;
    }

    CreateEnemy(x, y){
      let triggerTop = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y-30, 60, 20, {isSensor: true, label: 'triggerTop'});
      let triggerLeft = Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 35, y + 5, 15, 50, {isSensor: true, label: 'triggerLeft'});
      let triggerRight = Phaser.Physics.Matter.Matter.Bodies.rectangle(x + 35, y + 5, 15, 50, {isSensor: true, label: 'triggerRight'});
      let enemy = new Enemy({
        scene: this,
        x: x,
        y: y,
        w: 100,
        h: 100,
        hasGravity: false,
        image: 'dronCiudadano',
        score: 15,
        body: {
          parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 70, 60), triggerTop, triggerLeft, triggerRight],
          inertia: Infinity},
        label: 'enemy',
        triggerTop: triggerTop,
        triggerLeft: triggerLeft,
        triggerRight: triggerRight
      });
      enemy.setCollisionCategory(this.collisionLayers.enemy);
      enemy.setCollidesWith([this.collisionLayers.player, this.collisionLayers.whip, this.collisionLayers.triggers]);
      return enemy;
    }

    CreateBrokenGlass(x, y){
      let glass = new BrokenGlass({
        scene: this,
        x: x,
        y: y,
        w: 100,
        h: 30,
        hasGravity: false,
        image: 'playerImage',
        body: {
        parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 100, 30, {isSensor: true})],
        inertia: Infinity },
        label: 'brokenglass',
        slowMultiplier: 0.2
      });
      glass.setCollisionCategory(this.collisionLayers.obstacle);
      glass.setCollidesWith([this.collisionLayers.player]);
      return glass;
    }

    // Crea plataformas invisibles
    CreatePlatform(x, y, w, h){
      let plat = new PhysSprite({
        scene: this,
        x: x,
        y: y,
        w: w,
        h: h,
        body: {
          parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, w, h, {label: 'plataforma'})],
          inertia: Infinity},
        isStatic: true,
        label: 'platform'
      });
      plat.setCollisionCategory(this.collisionLayers.obstacle);
    }

    CreateLevelGoal(x, y){
      let goal = new LevelGoal({
        scene: this,
        x: x,
        y: y,
        w: 100,
        h: 100,
        hasGravity: false,
        body: {
          parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 100, 100, {isSensor: true})],
          inertia: Infinity},
        label: 'levelGoal'
      });
      goal.setCollisionCategory(this.collisionLayers.levelGoal);
      goal.setCollidesWith([this.collisionLayers.player]);
      return goal;
    }

    CreateDronCiudadano(x, y, objectives){
        // Body
        let triggerTop = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y - 30, 60, 20, {isSensor: true, label: 'triggerTop'});
        let triggerLeft = Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 35, y + 5, 15, 50, {isSensor: true, label: 'triggerLeft'});
        let triggerRight = Phaser.Physics.Matter.Matter.Bodies.rectangle(x + 35, y + 5, 15, 50, {isSensor: true, label: 'triggerRight'});
      let dron = new DronCiudadano({
        scene: this,
        x: x,
        y: y,
        w: 100,
        h: 100,
        hasGravity: false,
        image: 'dronCiudadano',
        score: 15,
        body: {
          parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 70, 60), triggerTop, triggerLeft, triggerRight],
          inertia: Infinity},
        label: 'enemy',
        triggerTop: triggerTop,
        triggerLeft: triggerLeft,
        triggerRight: triggerRight,
        objectives: objectives,
        speed: 0.1
      });
      dron.setCollisionCategory(this.collisionLayers.enemy);
      dron.setCollidesWith([this.collisionLayers.player, this.collisionLayers.whip, this.collisionLayers.triggers]);
      return dron;
    }

    CreateBoba(x, y, objectives){
        // Body
        let triggerTop = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y - 20, 50, 20, {isSensor: true, label: 'triggerTop'});
        let triggerLeft = Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 35, y, 15, 35, {isSensor: true, label: 'triggerLeft'});
        let triggerRight = Phaser.Physics.Matter.Matter.Bodies.rectangle(x + 35, y, 15, 35, {isSensor: true, label: 'triggerRight'});
      let boba = new Boba({
        scene: this,
        x: x,
        y: y,
        w: 100,
        h: 100,
        hasGravity: true,
        isStatic: false,
        image: 'boba',
        score: 15,
        body: {
          parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 60, 40), triggerTop, triggerLeft, triggerRight],
          inertia: Infinity},
        label: 'enemy',
        triggerTop: triggerTop,
        triggerLeft: triggerLeft,
        triggerRight: triggerRight,
        objectives: objectives,
        speed: 0.05
      });
      boba.setCollisionCategory(this.collisionLayers.enemy);
      boba.setCollidesWith([this.collisionLayers.player, this.collisionLayers.whip, this.collisionLayers.triggers, this.collisionLayers.obstacle]);
      return boba;
    }

    CreateTrigger(x, y, w, h){
      let trigger = new PhysSprite({
        scene: this,
        x: x,
        y: y,
        w: w,
        h: h, 
        hasGravity: false, 
        body: {
          parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, w, h, {isSensor: true})],
          inertia: Infinity},
        isStatic: true,
        label: 'trigger'
        });
      trigger.setCollisionCategory(this.collisionLayers.triggers);
      return trigger;
    }

    CreatePlayer(x, y){
      //HealthMeter
      let healthMeter = new HealthMeter({
        scene: this,
          x: x - 10,
          y: y - 35,
          w: 64,
          h: 32,
          displayTime: 1000,  //En ms
          image: 'healthMeter1',
          toy: 65
        });

        // Whips
        let whipLeft = new Whip({
          x: x - 100,
          y: y + 20,
          w: 150,
          h: 50,
          scene: this, 
          hasGravity: false,
          image: 'whipS',
          body:{
            parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 100, y + 20, 150, 50, {isSensor: true, label: 'whipLeft'})],
            inertia: Infinity
          },
          isStatic: false,
          label: 'whipLeft',
          offsetX: -100,
          offsetY: 20
        });
        whipLeft.setCollisionCategory(this.collisionLayers.whip);
        whipLeft.setCollidesWith([this.collisionLayers.enemy]);
        let whipRight = new Whip({
          x: x + 100,
          y: y + 20,
          w: 150,
          h: 50,
          scene: this, 
          hasGravity: false,
          image: 'whipS',
          body:{
            parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x + 100, y + 20, 150, 50, {isSensor: true, label: 'whipRight'})],
            inertia: Infinity
          },
          isStatic: false,
          label: 'whipRight',
          offsetX: 100,
          offsetY: 20
        });
        whipRight.setCollisionCategory(this.collisionLayers.whip);
        whipRight.setCollidesWith([this.collisionLayers.enemy]);
            
        // Player
          // Body
          let playerPartA = Phaser.Physics.Matter.Matter.Bodies.circle(x, y + 45, 18, {label: 'lowBall'});
          let playerPartB = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y + 10, 40, 70, {chamfer: {radius: 10}});
          let playerSensorFeet = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y + 70, 30, 20, {isSensor: true, label: 'feet'});
        this.player = new Player({
          scene: this,
          x: x,
          y: y,
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
          acceleration: 0.1,
          drag: 0.05,
          maxSpeedX: 12,
          mass: 70,
          restitution: 0,
          label: 'player',
          health: 3,
          healthMeter: healthMeter,
          pushX: 8,
          pushY: 6,
          whipLeft: whipLeft,
          whipRight: whipRight
        });
        this.player.setCollisionCategory(this.collisionLayers.player);

        whipLeft.SetAnchor(this.player);
        whipRight.SetAnchor(this.player);
  
        healthMeter.setTarget(this.player);
        return this.player;
    }

    AddScore(scoreAdd){
      this.score = this.score + scoreAdd;
      this.scoreText.text = "SCORE: " + this.score;
    }

    update(time, delta) {
      this.timeNum = this.timeNum + delta;
      this.timerText.text =  "TIME: "+ (Math.round(this.timeNum/1000)); 
    }
  }