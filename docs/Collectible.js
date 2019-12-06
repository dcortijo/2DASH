import PhysSprite from './PhysSprite.js';
export default class Collectible extends PhysSprite{
    constructor(config){ // config + {score}
        super(config);
        this.score = config.score;
    }

    OnTriggerStart = function(body, other){
        if(other.gameObject && other.gameObject.label === 'player' && !other.isSensor){
            this.Collect();
        }
    }

    OnTriggerStay = function(body, other){
        if(other.gameObject && other.gameObject.label === 'player' && !other.isSensor){
            this.Collect();
        }
    }

    Collect(){
        if(this.scene){
            this.scene.AddScore(this.score);
            this.destroy();
        }
    }
}