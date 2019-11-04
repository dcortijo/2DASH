import Character from './Character.js';
export default class Player extends Character{
    constructor(config){ // config + {jumpStrength, acceleration, maxSpeed, drag, mass}
        super(config);
        this.input = config.scene.input.keyboard.addKeys('W, A, S, D');
        this.jumpStrength = config.jumpStrength;
        this.acceleration = config.acceleration;
        this.setFriction(config.drag);
        this.setFixedRotation();
        this.setMass(config.mass);
        this.maxSpeedX = config.maxSpeedX;
        /*this.input.A.on('down', event => {
            this.MoveLeft();
            console.log("!");
        });*/
        /*this.input.D.on('down', event => {
            this.MoveRight();
        });*/
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
    }

    MoveLeft(){
        this.applyForce({x: -this.acceleration, y: 0});
    }

    MoveRight(){
        this.applyForce({x: this.acceleration, y: 0});
    }
}