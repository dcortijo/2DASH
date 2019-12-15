import PhysSprite from './PhysSprite.js';
export default class Bullet extends PhysSprite{
    constructor(config){ // config + { speed }
        super(config);
        this.speed = config.speed;
    }

    preUpdate(d, t){
        super.preUpdate(d, t);

        this.setVelocityX(-this.speed);
        this.setVelocityY(0);
    }

    OnCollisionStay(body, other, event){
        if(other.gameObject && other.gameObject === this.scene.player){
            other.gameObject.Hurt();
        }
        this.destroy();
    }
};