import Character from './Character.js';
export default class Player extends Character{
    constructor(config){ // config + {jumpStrength, acceleration, maxSpeed, drag, mass, restitution}
        super(config);
        this.input = config.scene.input.keyboard.addKeys('W, A, S, D');
        this.jumpStrength = config.jumpStrength;
        this.acceleration = config.acceleration;
        this.setFriction(0);
        this.setMass(config.mass);
        this.dragX = config.drag;
        this.maxSpeedX = config.maxSpeedX;
        this.setBounce(config.restitution);
        this.health = config.health;
        this.healthMeter = config.healthMeter;
    }

    preUpdate(){
        if(Math.abs(this.body.velocity.x) < this.maxSpeedX){
            if(this.input.A.isDown){
                this.MoveLeft();
            }
            if(this.input.D.isDown){
                this.MoveRight();
            }
        }

        if(this.input.W.isDown && this.onFloor){
            this.Jump(); 
        }

        // Drag X
        if(this.body.velocity.x < -0.1){
            this.applyForce({x: this.dragX, y: 0});
        } else if(this.body.velocity.x > 0.1){
            this.applyForce({x: -this.dragX, y: 0});
        } else {
            this.setVelocityX(0);
        }
    }

    Hurt(){
        this.health--;
        if(this.health === 0) this.Die();
        else this.healthMeter.HandleHealth(this.health);  
    }

    Die(){
        this.scene.scene.restart();
    }

    MoveLeft(){
        this.applyForce({x: -this.acceleration, y: 0});
    }

    MoveRight(){
        this.applyForce({x: this.acceleration, y: 0});
    }

    Jump(){
        this.setVelocityY(-this.jumpStrength);
        this.onFloor = false;
    }

    OnCollisionStart = function(body, other, event){
    }

    OnCollisionEnd = function (body, other, event) {
    }

    OnTriggerStart = function(body, other){

    }

    OnTriggerEnd = function(body, other){
        if(!other.isSensor){
            this.onFloor = false;
            //console.log("ontriggerend");
        }
    }

    OnTriggerStay = function(body, other){
        if(!other.isSensor){
            this.onFloor = true;
            //console.log("ontriggerstay");
        }
    }
}