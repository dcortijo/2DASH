import Enemy from './Character.js';
export default class Player extends Enemy{
    constructor(config){ // config + {jumpStrength, acceleration, maxSpeed, drag, mass, restitution, pushX, pushY}
        super(config);
        this.input = config.scene.input.keyboard.addKeys('up, left, right, Z, X');
        this.jumpStrength = config.jumpStrength;
        this.acceleration = config.acceleration;
        this.setFriction(0);
        this.setMass(config.mass);
        this.dragX = config.drag;
        this.maxSpeedX = config.maxSpeedX;
        this.curMaxSpeedX = config.maxSpeedX;
        this.baseSpeedX = config.baseSpeedX;
        this.setBounce(config.restitution);
        this.health = config.health;
        this.healthMeter = config.healthMeter;
        this.pushX = config.pushX;
        this.pushY = config.pushY;
        this.disabledControls = false;
        this.whipLeft = config.whipLeft;
        this.whipRight = config.whipRight;
        this.boostBool = true;
        this.curAnim = '';

        this.thrustDuration = 0;

        this.input.Z.on('down', event =>{if(!this.whipLeft.colliding && !this.whipRight.colliding)this.whipLeft.Attack(); this.StallFall();});
        this.input.X.on('down', event =>{if(!this.whipLeft.colliding && !this.whipRight.colliding)this.whipRight.Attack(); this.StallFall();});
    }

    preUpdate(t, d){
        super.preUpdate(t, d);

        if(this.body.velocity.y < -0.01 || this.body.velocity.y > 0.01){
            if(this.body.velocity.x < -0.1) this.anims.play('jumpLeft');
            else this.anims.play('jumpRight')
        }else if(this.curAnim === '') this.anims.play('runRight');

        // Input
        if(!this.disabledControls){
            if(Math.abs(this.body.velocity.x) < this.curMaxSpeedX){
                if(this.input.left.isDown){
                    this.MoveLeft();
                }
                if(this.input.right.isDown){
                    this.MoveRight();
                }
            }

            // State Machine
            if(this.body.velocity.x < 0) this.curAnim = 'runLeft';
            else if(this.body.velocity.x > 0) this.curAnim = 'runRight';
            else if(this.body.velocity.y != 0){
                if(this.body.velocity.x < -0.1) this.curAnim = 'jumpLeft';
                else this.curAnim = 'jumpRight';
            }
            else this.curAnim = '';

            if(this.onFloor){
                if(this.input.up.isDown){
                    this.Jump(); 
                } else{
                    this.setVelocityY(0);
                }
            }
        }

        // Animation
        if(this.curAnim != '' && !this.anims.isPlaying) this.play(this.curAnim);

        // Drag X
        if(this.body.velocity.x < -0.1){
            this.applyForce({x: this.dragX, y: 0});
        } else if(this.body.velocity.x > 0.1){
            this.applyForce({x: -this.dragX, y: 0});
        } else {
            this.setVelocityX(0);
            this.anims.stop();
        }

        if(this.thrustDuration > -1) this.applyForce({x: 0, y: -0.1});

        if(this.thrustDuration > -1){
            this.thrustDuration--;
        }else this.thrustDuration = -1;
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
        if(this.body.velocity.x > -0.1 && this.body.velocity.x < 0.1) this.setVelocityX(-this.baseSpeedX);
        this.applyForce({x: -this.acceleration, y: 0});
    }

    MoveRight(){
        if(this.body.velocity.x > -0.1 && this.body.velocity.x < 0.1) this.setVelocityX(this.baseSpeedX);
        this.applyForce({x: this.acceleration, y: 0});
    }

    Jump(){
        this.setVelocityY(-this.jumpStrength);
        this.onFloor = false;
    }

    BoostJump(){
        this.Jump();
        this.setVelocityX(this.body.velocity.x * 1.2);
    }

    OnTriggerEnd = function(body, other){
        if(!other.isSensor){
            this.onFloor = false;
            //console.log("ontriggerend");
        }
    }

    OnCollisionStart(body, other){
        if(other.gameObject && !other.gameObject.Die){
            this.disabledControls = false;
        }
    }

    OnCollisionStay(body, other){
        if(!other.isSensor && other.gameObject) {
            if(!other.gameObject.Die && body.label === 'lowBall'){
                this.onFloor = true;
                this.boostBool = true;
                
            }
        }
    }

    PushLeft(){
        this.setVelocityX(-this.pushX);
        this.setVelocityY(-this.pushY);
        this.disabledControls = true;
        //this.applyForce({x: -10000, y: -10000});
    }

    PushRight(){
        this.setVelocityX(this.pushX);
        this.setVelocityY(-this.pushY);
        this.disabledControls = true;
        //this.applyForce({x: this.pushX, y: -this.pushY});
    }

    ReduceMaxSpeed(multiplier){
        if(this.curMaxSpeedX === this.maxSpeedX){
        this.curMaxSpeedX = this.maxSpeedX * multiplier;
        } else if(this.curMaxSpeedX > this.maxSpeedX * multiplier){
            this.curMaxSpeedX = this.maxSpeedX * multiplier;
        }
    }

    ResetMaxSpeed(){
        this.curMaxSpeedX = this.maxSpeedX;
    }

    GetFeet(){
        return this.body.parts.find(elem => elem.label === 'feet');
    }

    /*StallFall(){       
        if(!this.onFloor && this.boostBool){
            if(this.body.velocity.y > (-this.jumpStrength + this.jumpStrength/3)){
                this.setVelocityY(0);
                this.applyForce({x: 0, y: -1});
                this.boostBool = false;
            }
        }
    }*/

    StallFall(){ 
        if(this.thrustDuration === -1 && this.body.velocity.y > (-this.jumpStrength + this.jumpStrength/3) && !this.onFloor && this.boostBool){
            this.thrustDuration = 15;
            this.boostBool = false;
            this.setVelocityY(0);
        }            
    }

}