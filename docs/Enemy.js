import Character from './Character.js';
export default class Enemy extends Character{ // config
    constructor(config){
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
    }

    preUpdate(){
        this.x = this.varX;
        this.y = this.varY;
        //this.setVelocity(this.body, {x:0.1, y:0.1});
        //console.log(this.body.velocity);
    }

    OnCollisionStart = function(body1, body2, evento){       
        if(body2.gameObject && body2.gameObject.Die){     
            body2.gameObject.Die();
            console.log("¡Zasca!");
        } 
    }

    OnTriggerStart = function(obj1, obj2){
        if(obj2.gameObject && obj2.gameObject.Jump){
            obj2.gameObject.Jump();
            this.Die();
        }
    }
}