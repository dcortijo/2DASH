import Character from './Character.js';
export default class Enemy extends Character{
    constructor(config){ // config de Character
        super(config);
        this.setFriction(1, 1, 1);
        this.triggerLeft = config.triggerLeft;
        this.triggerRight = config.triggerRight;
        this.triggerTop = config.triggerTop;
        this.colliding = false;
        this.score = config.score;
    }

    OnCollisionStart(body1, body2, evento){
        if(body2.gameObject && body2.gameObject.Hurt){
            this.colliding = true;
            body2.gameObject.Hurt();
        } 
    }
    
    OnCollisionEnd(body, other, evento) {
        if(other.gameObject && other.gameObject.Hurt){
            this.colliding = false;
        }
    }

    OnTriggerStart(obj1, obj2){
        if(obj2.gameObject && obj2.gameObject.label === 'player'){
            if(obj1 === this.triggerTop && obj2.gameObject.GetFeet() === obj2){
                obj2.gameObject.BoostJump();
                this.Die();
            }
        }
    }

    OnTriggerEnd(body, other) {
        if(other.gameObject && other.gameObject.label === 'player'){
         this.colliding = false;   
        }
    }

    OnTriggerStay(body, other){
        if(other.gameObject && other.gameObject.label === 'player'){
            if(this.colliding){
                if(body === this.triggerLeft){
                    other.gameObject.PushLeft();
                } else if(body === this.triggerRight){
                    other.gameObject.PushRight();
                }
            }
        }
    }

    Die(){
        this.scene.AddScore(this.score);
        super.Die();
    }
}