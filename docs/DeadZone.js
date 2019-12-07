import PhysSprite from './PhysSprite.js';
export default class DeadZone extends PhysSprite{

    constructor(config){ // config de PhysSprite
        super(config);
    }

    OnTriggerStart(body, other){
        if(other.gameObject && other.gameObject.label === 'player'){
            other.gameObject.Die();
        }
    }
}