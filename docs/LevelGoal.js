import PhysSprite from './PhysSprite.js';
export default class LevelGoal extends PhysSprite{
    constructor(config){ // config de PhysSprite
        super(config);
    }

    OnTriggerStart(obj1, obj2){
        if(!obj2.isSensor && obj2.gameObject.label === "player" /*&& obj2.label === "Rectangle Body"*/){
            this.EndLevel();
        }
    }

    EndLevel(){
        this.scene.NextLevel();
    }
}