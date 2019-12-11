import PhysSprite from './PhysSprite.js';
export default class PlatformCrumbling extends PhysSprite{
    constructor(config){
        super(config);
        this.setFriction(1, 1, 1);
        this.timeToCrumble = config.timeToCrumble;  
        //this.crumblingTime = config.crumblingTime;
        this.curX = this.x;
        this.curY = this.y;
        this.stepTimer = 0;
        //this.fallTimer = 0;
        this.state = "normal";
    }

    preUpdate(t, d){
        console.log(this.stepTimer);
        switch(this.state){
            case "normal":
                if(this.stepTimer >= this.timeToCrumble) this.state = "falling"
                else this.setPosition(this.curX, this.curY);
                break;
            /*case "falling":
                if(this.fallTimer === 0){
                    this.fallTimer = this.crumblingTime;
                    this.setIgnoreGravity(false);
                } else if(this.fallTimer < -1){
                    this.state = "fallen";
                    this.setIgnoreGravity(true);
                } 
                else this.fallTimer = this.fallTimer - d;
                break;
            case "fallen":
                break;*/
            default:
                break;
        }   
    }

    OnCollisionStay(body, other){
        if(other.gameObject && other.label && other.label === 'lowBall'){
            if(this.state === "normal") this.stepTimer = this.stepTimer + 1;
        }
    }

    OnCollisionEnd(body, other){
        if(other.gameObject && other.label && other.label === 'lowBall'){
            if(this.state === "normal") this.stepTimer = 0;
        }
    }
}