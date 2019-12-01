import Character from './Character.js';
export default class Enemy extends Character{
    constructor(config){ // config de Character
        super(config);
        this.setFixedRotation();
        this.setFriction(1, 1, 1)
        this.varX = config.x;
        this.varY = config.y;
        this.triggerLeft = config.triggerLeft;
        this.triggerRight = config.triggerRight;
        this.triggerTop = config.triggerTop;
        this.colliding = false;
        this.score = config.score;
    }

    preUpdate(){
        this.x = this.varX;
        this.y = this.varY;
    }

    OnCollisionStart = function(body1, body2, evento){       
        if(body2.gameObject && body2.gameObject.Hurt){    
            this.colliding = true; 
            body2.gameObject.Hurt();
        } 
    }
    
    OnCollisionEnd = function (body, other, evento) {
        if(other.gameObject && other.gameObject.Hurt){
            this.colliding = false;
        }
    }

    OnTriggerStart = function(obj1, obj2){
        if(obj2.gameObject && obj2.gameObject.label === 'player'){
            if(obj1 === this.triggerTop && obj2.gameObject.GetFeet() === obj2){
                obj2.gameObject.BoostJump();
                this.Die();
            }
        }
    }

    OnTriggerEnd = function (body, other) {
        if(other.gameObject && other.gameObject.label === 'player'){
         this.colliding = false;   
        }
    }

    OnTriggerStay = function(body, other){
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