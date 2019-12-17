import Game from './game.js'

export default class Nivel1 extends Game {
    constructor() {
      super('Nivel1');
    }

    create() {
      super.create()

      // Background
      let background = this.add.image(-100, 0, 'backgroundNivel1');
      background.setOrigin(0, 0);
      background.displayWidth = 1640;
      background.displayHeight = 810;
      background.setScrollFactor(0);

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

      //Tilemap
      this.map = this.make.tilemap({ 
        key: 'Nivel1', 
        tileWidth: 64, 
        tileHeight: 64,
      });
      this.map.addTilesetImage('tileset1', 'patrones');
      this.map.addTilesetImage('tilesetB', 'patronesB');
      this.map.addTilesetImage('tilesetF', 'patronesF');
      this.layerB = this.map.createStaticLayer('layerB', 'tilesetB');
      let objectLayers = this.map.objects;

      // Object layers
      this.CreateLevelGoal(objectLayers[7].objects[0].x + objectLayers[7].objects[0].width/2, objectLayers[7].objects[0].y + objectLayers[7].objects[0].height/2);

      for(let i = 0; i < objectLayers[6].objects.length; i++){
        this.CreateDeadZone(objectLayers[6].objects[i].x, objectLayers[6].objects[i].y, objectLayers[6].objects[i].width, objectLayers[6].objects[i].height);
      }
      for(let i = 0; i < objectLayers[5].objects.length; i++){
        this.CreatePlatform(objectLayers[5].objects[i].x, objectLayers[5].objects[i].y, objectLayers[5].objects[i].width, objectLayers[5].objects[i].height);
      }

      this.CreatePlayer(objectLayers[4].objects[0].x, objectLayers[4].objects[0].y);

      for(let i = 0; i < objectLayers[3].objects.length; i++){     
          this.CreateColectible(objectLayers[3].objects[i].x, objectLayers[3].objects[i].y);
      }
      
      for(let i = 0; i < objectLayers[1].objects.length; i++){
        let arrObjetivos = [];
        for(let j = 0; j < objectLayers[2].objects.length; j++){
          if(objectLayers[2].objects[j].type === objectLayers[1].objects[i].type){
            let trigger = this.CreateTrigger(objectLayers[2].objects[j].x ,
              objectLayers[2].objects[j].y, 30, 30);
              arrObjetivos.push(trigger);
          }          
        }
        if(objectLayers[1].objects[i].name === 'Dron'){
          this.CreateDronCiudadano(objectLayers[1].objects[i].x, objectLayers[1].objects[i].y, arrObjetivos);
        }else if(objectLayers[1].objects[i].name === 'Boba'){
          this.CreateBoba(objectLayers[1].objects[i].x, objectLayers[1].objects[i].y, arrObjetivos);
        }
      }

      for(let i = 0; i < objectLayers[0].objects.length; i++){     
          this.CreateBrokenGlass(objectLayers[0].objects[i].x, objectLayers[0].objects[i].y);
      }
      
      //this.matter.world.convertTilemapLayer(this.layer);
      this.layer = this.map.createStaticLayer('layer', 'tileset1');
      this.layerF = this.map.createStaticLayer('layerF', 'tilesetF');

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
















      this.CreateShooter(1000, 2800);
    }

    NextLevel(){
      this.scene.start('Nivel2', {score: this.score, time: this.timeNum});
    }
}