import PhysSprite from "./PhysSprite.js"
export default class DynamicObj extends PhysSprite{

    constructor(scene, x, y, w, h, image, speedX, speedY, drag, maxSpeedX, maxSpeedY){
        super(scene, x, y, w, h, image);
        this.setCollisionCategory(scene.dynamicObjs);
        this.speedX = speedX;
        this.speedY = speedY;
        this.body.maxVelocity = new Phaser.Math.Vector2(maxSpeedX, maxSpeedY);
        if(drag > 0){
            this.body.allowDrag = true;
        }
        this.body.drag = new Phaser.Math.Vector2(drag, 0);
    }

    moveLeft(){
        this.body.setVelocityX(-this.speedX);
    }

    moveRight(){
        this.body.setVelocityX(this.speedX);
    }
    
    moveUp(){
        this.body.setVelocityY(-this.speedY);
    }

    moreDown(){
        this.body.setVelocityY(this.speedY);
    }

    move(x, y){
        this.body.setVelocity(x, y);
    }

    accelerateLeft(){
        this.body.setAcceleration(-this.speedX);
    }

    accelerateRight(){
        this.body.setAcceleration(-this.speedX);
    }

    accelerateUp(){
        this.body.setAcceleration(-this.speedX);
    }

    accelerateDown(){
        this.body.setAcceleration(-this.speedX);
    }

    accelerate(x, y){
        this.body.setAcceleration(x, y);
    }
}