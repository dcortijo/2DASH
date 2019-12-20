import PhysSprite from './PhysSprite.js';
export default class Whip extends PhysSprite{
    constructor(config){    // config + {anchor, offsetX, offsetY}
        super(config);
        this.anchor = config.anchor;
        this.offsetX = config.offsetX;
        this.offsetY = config.offsetY;
        this.colliding = false;
        this.setFrame(1);
        this.on('animationcomplete', (event) => {
            this.colliding = false;
        });
    }

    preUpdate(d, t){
        super.preUpdate(d, t);
        this.x = this.anchor.x + this.offsetX;
        this.y = this.anchor.y + this.offsetY;
    }

    OnTriggerStay(body, other){
        if(!other.isSensor && other.gameObject && other.gameObject.Die && this.colliding){
            other.gameObject.Die();
        }
    }

    Attack(){
        if(this.anims === undefined) console.log("!");
        this.colliding = true;
        this.anims.play('whip');
        this.scene.sound.play('crack');
    }

    SetAnchor(p){
        this.anchor = p;
    }
}