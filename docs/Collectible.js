import PhysSprite from './PhysSprite.js';
export default class Collectible extends PhysSprite{
    constructor(config){ // config + {score}
        super(config);
        this.score = config.score;
    }

    OnTriggerStart(body, other){
        if(other.gameObject && other.gameObject.label === 'player' && !other.isSensor){
            this.Collect();
        }
    }

    OnTriggerStay(body, other){
        if(other.gameObject && other.gameObject.label === 'player' && !other.isSensor){
            this.Collect();
        }
    }

    Collect(){
        if(this.scene){
            this.scene.sound.play('coin');
            this.scene.AddScore(this.score);
            this.destroy();
        }
    }
}