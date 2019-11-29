import PhysSprite from './PhysSprite.js';
export default class Whip extends PhysSprite{
    constructor(config){    // config + {anchor, offsetX, offsetY}
        super(config);
        this.anchor = config.anchor;
        this.offsetX = config.offsetX;
        this.offsetY = config.offsetY;
        this.active = false;
    }

    preUpdate(){
        //super.preUpdate(d, t);
        this.x = this.anchor.x + this.offsetX;
        this.y = this.anchor.y + this.offsetY;
        console.log("!");
    }

    OnTriggerStay(body, other){
        if(!other.isSensor && other.gameObject && other.gameObject.Die && this.active){
            other.gameObject.Die();
        }
    }

    SetAnchor(p){
        this.anchor = p;
    }
}