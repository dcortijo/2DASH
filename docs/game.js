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
import CableDefectuoso from './CableDefectuoso.js';
import Electricity from './Electricity.js'
import MovingPlatform from './MovingPlatform.js'
import PlatformCrumbling from './PlatformCrumbling.js'
import Shooter from './NotSoSharpShooter.js'
import Bullet from './Bullet.js'

export default class Game extends Phaser.Scene{
    constructor(keyname) {
        super({key: keyname});
    }

    create(){
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
        let deadZoneBody = Phaser.Physics.Matter.Matter.Bodies.rectangle(x + w/2, y + h/2, w, h, { isSensor: true });
        let deadZone = new DeadZone({
          scene: this,
          x: x + w/2,
          y: y + h/2,
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
            x: x + 50,
            y: y - 15,
            w: 100,
            h: 30,
            hasGravity: false,
            image: 'cristalRoto',
            body: {
            parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x + 50, y - 15, 100, 30, {isSensor: true})],
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
            x: x + w/2,
            y: y + h/2,
            w: w,
            h: h,
            body: {
              parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x + w/2, y +h/2, w, h, {label: 'plataforma'})],
              inertia: Infinity},
            isStatic: true,
            label: 'platform'
          });
          plat.setCollisionCategory(this.collisionLayers.obstacle);
          return plat;
        }
    
        CreateLevelGoal(x, y){
          let goal = new LevelGoal({
            scene: this,
            x: x,
            y: y,
            w: 128,
            h: 128,
            hasGravity: false,
            image: 'levelGoal',
            body: {
              parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 128, 128, {isSensor: true})],
              inertia: Infinity},
            label: 'levelGoal'
          });
          goal.setCollisionCategory(this.collisionLayers.levelGoal);
          goal.setCollidesWith([this.collisionLayers.player]);
          return goal;
        }
    
        CreateDronCiudadano(x, y, objectives){
            // Body
            let triggerTop = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y - 30, 60, 35, {isSensor: true, label: 'triggerTop'});
            let triggerLeft = Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 40, y + 5, 15, 50, {isSensor: true, label: 'triggerLeft'});
            let triggerRight = Phaser.Physics.Matter.Matter.Bodies.rectangle(x + 40, y + 5, 15, 50, {isSensor: true, label: 'triggerRight'});
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
            speed: 0.04
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
              let playerPartB = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y + 10, 40, 70);      
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
              whipRight: whipRight,
              invul: 2000,
            });
            this.player.setCollisionCategory(this.collisionLayers.player);
    
            whipLeft.SetAnchor(this.player);
            whipRight.SetAnchor(this.player);
      
            healthMeter.setTarget(this.player);

            // Camera
            // Remove default camera
            this.cameras.remove(this.cameras.main);
            let cam = new PlayerCamera({
            x: 0,
            y: 0,
            width: 1440,
            height: 810,
            bounds: { x: 0, y: 0, width: 32000, height: this.camBoundsHeight },
            target: this.player,
            maxOffsetX: 400,
            offsetY: 200,
            repositionSpeed: 5
            });
            this.cameras.addExisting(cam, true);
            return this.player;
        }
    
        CreateCableDefectuoso(x, y){
          let elec = new Electricity({
            x: x + 24,
            y: y - 75,
            w: 32,
            h: 100,
            scene: this, 
            hasGravity: false,
            image: 'electricity',
            body:{
              parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y - 75, 48, 150, {isSensor: true, label: 'elec'})],
              inertia: Infinity
            },
            isStatic: false,
          });
          elec.setCollisionCategory(this.collisionLayers.obstacle);
          elec.setCollidesWith([this.collisionLayers.player]);
    
          let cable = new CableDefectuoso({
            scene: this,
            x: x,
            y: y - 16,
            w: 64,
            h: 32,
            hasGravity: false,
            image: 'cableD',
            body: {
            parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y - 16, 64, 32, {isSensor: true})],
            inertia: Infinity 
          },
            label: 'cable',
            coolDown: 2000,
            hitBox: elec,
          });
          cable.setCollisionCategory(this.collisionLayers.obstacle);
          cable.setCollidesWith([this.collisionLayers.player]);
          return cable;
        }
        
        CreateMovingPlatform(x, y, w, h, objectives){
          let plat = new MovingPlatform({
            scene: this,
            x: x + w/2,
            y: y + h/2,
            w: w,
            h: h,
            hasGravity: false,
            image: 'playerImage',
            body: {
              parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x + w/2, y + h/2, w, h)],
              inertia: Infinity,
            },
            objectives: objectives,
            label: 'movingPlat',
            isStatic: false,
            speed: 0.05,
          });
          plat.setCollisionCategory(this.collisionLayers.obstacle);
          return plat;
        }

        CreatePlatformCrumbling(x, y, w, h){
          let plat = new PlatformCrumbling({
            scene: this,
            x: x + w/2,
            y: y + h/2,
            w: w,
            h: h,
            hasGravity: false,
            image: 'platCrumb',
            body: {
              parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x + w/2, y + h/2, w, h, {label: 'plataforma'})],
              inertia: Infinity,},
            isStatic: true,
            distanceToCollapse: 448,
            label: 'cringePlatform'
            //crumblingTime: 1000,
          });
          plat.setCollisionCategory(this.collisionLayers.obstacle);
          return plat;
        }

        CreateBullet(x, y, flipX){
          let bullet = new Bullet({
            scene: this,
            x: x,
            y: y,
            w: 15,
            h: 15,
            hasGravity: false,
            image: 'bullet',
            body:{
              parts: [Phaser.Physics.Matter.Matter.Bodies.circle(x, y, 15, {label: 'bullet'})]},
            isStatic: false,
            label: 'bullet',
            speed: 3,
            flipX: flipX
          });
          bullet.setCollisionCategory(this.collisionLayers.enemy);
          bullet.setCollidesWith([this.collisionLayers.player]);
          return bullet;
        }

        CreateShooter(x, y, flipX){
          // Body
          let triggerTop = Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 35, y - 70, 70, 20, {isSensor: true, label: 'triggerTop'});
          let triggerLeft = Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 75, y - 25, 15, 65, {isSensor: true, label: 'triggerLeft'});
          let triggerRight = Phaser.Physics.Matter.Matter.Bodies.rectangle(x + 5, y - 25, 15, 65, {isSensor: true, label: 'triggerRight'});
          let shooter = new Shooter({
            scene: this,
            x: x - 35,
            y: y - 25,
            w: 70,
            h: 70,
            hasGravity: true,
            image: 'shooter',
            body:{
              parts: [Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 35, y - 25, 70, 70, {label: 'shooter'}), triggerTop, triggerLeft, triggerRight]},
            isStatic: true,
            label: 'shooter',
            triggerTop: triggerTop,
            triggerLeft: triggerLeft,
            triggerRight: triggerRight,
            shootDelay: 2000,
            score: 15,
            flipX: flipX
          });
          shooter.setCollisionCategory(this.collisionLayers.enemy);
          shooter.setCollidesWith([this.collisionLayers.player, this.collisionLayers.whip]);
          return shooter;
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