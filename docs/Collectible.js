import TriggerObj from './TriggerObj.js';
export default class Collectible extends TriggerObj{
    constructor(scene, x, y, w, h, image, score){
        super(scene, x, y, w, h, image, false, true);
        this.score = score;
    }

    OnTrigger = function(other){
        if(other === this.scene.personaje){
            this.Collect();
        }
    }

    Collect(){
        console.log("Collected!");
        this.destroy();
    }
}