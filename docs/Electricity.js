import PhysSprite from './PhysSprite.js'
export default class Electricity extends PhysSprite{
    constructor(config){
        super(config);
        this.colliding = false;
        this.setFrame(4);
        this.on('animationcomplete', (event) => { this.colliding = false; });
    }

    OnTriggerStay(body, other){
        if(!other.isSensor && other.gameObject && other.gameObject.label === 'player' && this.colliding){
            other.gameObject.Hurt();
            if(other.gameObject.x > this.x)  other.gameObject.PushRight();        
            else other.gameObject.PushLeft();
        }
    }

    Attack(){       
        this.colliding = true;
        this.anims.play('zap');
    }
}

  