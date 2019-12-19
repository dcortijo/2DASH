import Game from './game.js'
import Bullet from './Bullet.js'

export default class Nivel2 extends Game {
    constructor() {
      super('Nivel2');
    }

    create(data) {
      super.create()
      this.camBoundsHeight = 3200;

      this.music = data.music;
      if(!this.music.isPlaying) this.music.play;

      // Background
      let background = this.add.image(-100, 0, 'backgroundNivel2');
      background.setOrigin(0, 0);
      background.displayWidth = 1640;
      background.displayHeight = 810;
      background.setScrollFactor(0, 0);

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
        key: 'Nivel2', 
        tileWidth: 64, 
        tileHeight: 64,
      });
      this.map.addTilesetImage('tileset2', 'patrones');
      this.map.addTilesetImage('tilesetB2', 'patronesB');
      this.map.addTilesetImage('tilesetF2', 'patronesF');
      this.layerB = this.map.createStaticLayer('layerB', 'tilesetB2');
      let objectLayers = this.map.objects;

      // Object layers
      for(let i = 0; i < objectLayers[8].objects.length; i++){
        this.CreatePlatformCrumbling(objectLayers[8].objects[i].x, objectLayers[8].objects[i].y, objectLayers[8].objects[i].width, objectLayers[8].objects[i].height);
      }

      this.CreateLevelGoal(objectLayers[7].objects[0].x + objectLayers[7].objects[0].width/2, objectLayers[7].objects[0].y + objectLayers[7].objects[0].height/2);

      for(let i = 0; i < objectLayers[2].objects.length; i++){
        this.CreateDeadZone(objectLayers[2].objects[i].x, objectLayers[2].objects[i].y, objectLayers[2].objects[i].width, objectLayers[2].objects[i].height);
      }

      for(let i = 0; i < objectLayers[0].objects.length; i++){
        this.CreatePlatform(objectLayers[0].objects[i].x, objectLayers[0].objects[i].y, objectLayers[0].objects[i].width, objectLayers[0].objects[i].height);   
      }

      this.CreatePlayer(objectLayers[1].objects[0].x, objectLayers[1].objects[0].y);

      for(let i = 0; i < objectLayers[5].objects.length; i++){  
        if(objectLayers[5].objects[i].name === 'Big'){
          this.CreateBigColectible(objectLayers[5].objects[i].x, objectLayers[5].objects[i].y);
        } else{
          this.CreateColectible(objectLayers[5].objects[i].x, objectLayers[5].objects[i].y);
        }     
      }
      
      for(let i = 0; i < objectLayers[4].objects.length; i++){
        let arrObjetivos = [];
        for(let j = 0; j < objectLayers[3].objects.length; j++){
          if(objectLayers[3].objects[j].type === objectLayers[4].objects[i].type){
            let trigger = this.CreateTrigger(objectLayers[3].objects[j].x ,
              objectLayers[3].objects[j].y, 30, 30);
              arrObjetivos.push(trigger);
          }          
        }
        if(objectLayers[4].objects[i].name === 'Dron'){
          this.CreateDronCiudadano(objectLayers[4].objects[i].x, objectLayers[4].objects[i].y, arrObjetivos);
        }else if(objectLayers[4].objects[i].name === 'Boba'){
          this.CreateBoba(objectLayers[4].objects[i].x, objectLayers[4].objects[i].y, arrObjetivos);
        }
      }

      for(let i = 0; i < objectLayers[6].objects.length; i++){     
          this.CreateBrokenGlass(objectLayers[6].objects[i].x, objectLayers[6].objects[i].y);
      }
      
      //this.matter.world.convertTilemapLayer(this.layer);
      this.layer = this.map.createStaticLayer('layer', 'tileset2');
      this.layerF = this.map.createStaticLayer('layerF', 'tilesetF2');

      //Score
      this.score = data.score;
      this.scoreText = this.add.text(70, 55, "SCORE: " + this.score, {fill: "#ffffff"}).setFontSize(40);
      this.scoreText.setScrollFactor(0);

      //Timer
      this.timeNum = data.time;
      this.timerText = this.add.text(1200, 55, "TIME: " + (Math.round(this.timeNum/1000)), {fill: "#ffffff"}).setFontSize(40);
      this.timerText.setScrollFactor(0);

      // World walls
      this.matter.world.setBounds(0, 0, 32000, 3250);
    }

    NextLevel(){
      this.scene.start('Nivel3', {score: this.score, time: this.timeNum, music: this.music});
    }
}