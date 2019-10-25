import PhysSprite from './PhysSprite.js';
export default class Collectible extends PhysSprite{
    constructor(scene, x, y, w, h, image, score){
        super(scene, x, y, w, h, image, false, true);
        this.score = score;
    }

    OnTrigger = function(other){
        if(other === this.scene.personaje){
            Collect();
        }
    }

    Collect(){
        console.log("Collected!");
    }
}