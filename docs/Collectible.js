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

    Collect(){
        this.scene.AddScore(this.score);
        this.destroy();
    }
}