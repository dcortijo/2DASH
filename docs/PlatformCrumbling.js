import PhysSprite from './PhysSprite.js';
export default class PlatformCrumbling extends PhysSprite{
    constructor(config){
        super(config);
        this.setFriction(0.2, 0.2, 0.2);
        this.distanceToCollapse = config.distanceToCollapse;
        this.crumblingTime = config.crumblingTime;
        this.fallTimer = -1;
        this.state = "normal";
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        //console.log(this.state)
        switch(this.state){
            case "normal":
                if(this.x - this.scene.player.x < this.distanceToCollapse){
                    this.setStatic(false);
                    this.setIgnoreGravity(false);
                    this.state = "falling";
                } 
                break;
            case "falling":
                /*if(this.fallTimer === -1){
                    
                    this.fallTimer = this.crumblingTime;
                    this.setStatic(false);
                    this.setIgnoreGravity(false);
                } else if(this.fallTimer <= 0){
                    this.state = "fallen";
                    this.setIgnoreGravity(true);
                    this.setStatic(true);
                } 
                else this.fallTimer = this.fallTimer - d;*/
                this.angle += 0.5;
                break;
            case "fallen":
                break;
            default:
                break;
        }   
    }

    OnCollisionStay(body, other){
        if(other.gameObject && other.label && other.label === 'plataforma'){
            if(this.state === "falling"){
                this.state = "fallen";
                this.setIgnoreGravity(true);
                this.setStatic(true);
            };
        }
    }

    /*OnCollisionEnd(body, other){
        if(other.gameObject && other.label && other.label === 'lowBall'){
            if(this.state === "normal") this.stepTimer = 0;
        }
    }*/
}