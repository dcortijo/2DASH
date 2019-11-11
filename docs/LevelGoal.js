import PhysSprite from './PhysSprite.js';
export default class LevelGoal extends PhysSprite{
    constructor(config){ // config de PhysSprite
        super(config);
    }

    OnTriggerEnter = function(other){
        if(!other.gameObject.isSensor && other.gameObject.label === "player"){
            this.EndLevel();
        }
    }

    EndLevel(){
        console.log("Level complete!");
    }
}