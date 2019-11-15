import Character from './Character.js';
export default class Enemy extends Character{
    constructor(config){ // config de Character
        super(config);
        this.setFixedRotation();
        this.setFriction(1, 1, 1)
        /*this.setFrictionAir(1);
        this.body.inertia = Infinity;
        this.setMass(Infinity);
        console.log(this.body.inertia);
        this.body.setInertia(this.body, 10);*/
        this.varX = config.x;
        this.varY = config.y;
        this.triggerLeft = this.body.parts.find(function(element){return element.label === 'triggerLeft';});
        this.triggerRight = this.body.parts.find(function(element){return element.label === 'triggerRight';});
        this.triggerTop = this.body.parts.find(function(element){return element.label === 'triggerTop';});
        this.colliding = false;
    }

    preUpdate(){
        this.x = this.varX;
        this.y = this.varY;
        //this.setVelocity(this.body, {x:0.1, y:0.1});
        //console.log(this.body.velocity);
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
            if(obj1 === this.triggerTop){
                obj2.gameObject.Jump();
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
}