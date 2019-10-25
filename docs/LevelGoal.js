import TriggerObj from './TriggerObj.js';
export default class LevelGoal extends TriggerObj{
    constructor(scene, x, y, w, h, image){
        super(scene, x, y, w, h, image);
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