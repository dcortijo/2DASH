export default class HealthMeter extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, config.image);
        config.scene.add.existing(this);
        this.displayTime = config.displayTime;
        this.displayWidth = config.w;
        this.displayHeight = config.h;
        this.targetOffsetY = config.toy;
        this.timer = 0;  
        this.alpha = 0;      
    }

    preUpdate(time, delta){
        this.x = this.target.x; 
        this.y = this.target.y - this.targetOffsetY;
        this.updateTimer(delta);
    }

    setTarget(obj){
        this.target = obj;
    }

    updateTimer(delta){
        if(this.timer < 0){
            this.timer = 0;
            this.alpha = 0;
        } 
        else if(this.timer > 0) this.timer -= delta;
    }

    HandleHealth(num){
        if(num === 1) this.setFrame(1);
        this.timer = this.displayTime;
        this.alpha = 255;
    }
}