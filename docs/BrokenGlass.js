import PhysSprite from './PhysSprite.js';
export default class BrokenGlass extends PhysSprite{
    constructor(config){    // config + {slowMultiplier}
        super(config);
        this.slowMultiplier = config.slowMultiplier;
    }

    OnTriggerStart = function(body, other){
        if(other.gameObject && other.gameObject.label === 'player'){
            other.gameObject.ReduceMaxSpeed(this.slowMultiplier);
        }
    }

    OnTriggerEnd = function(body, other){
        if(other.gameObject && other.gameObject.label === 'player'){
            other.gameObject.ResetMaxSpeed();
        }
    }
}