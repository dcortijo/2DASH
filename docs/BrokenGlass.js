import PhysSprite from './PhysSprite.js';
export default class BrokenGlass extends PhysSprite{
    constructor(config){    // config + {slowMultiplier}
        super(config);
        this.slowMultiplier = config.slowMultiplier;
    }

    OnTriggerStart(body, other){
        if(other.gameObject && other.gameObject.label === 'player' && !other.isSensor){
            other.gameObject.ReduceMaxSpeed(this.slowMultiplier);
        }
    }

    OnTriggerEnd(body, other){
        if(other.gameObject && other.gameObject.label === 'player' && !other.isSensor){
            other.gameObject.ResetMaxSpeed();
        }
    }
}