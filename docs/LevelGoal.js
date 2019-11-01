import PhysSprite from './PhysSprite.js';
export default class LevelGoal extends PhysSprite{
    constructor(config){ // config de PhysSprite
        super(config);
    }

    OnTrigger = function(other){
        if(other === this.scene.personaje){
            this.EndLevel();
        }
    }

    EndLevel(){
        console.log("Level complete!");
    }
}