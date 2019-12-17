import PhysSprite from './PhysSprite.js';
export default class Bullet extends PhysSprite{
    constructor(config){ // config + { speed }
        super(config);
        this.speed = config.speed;
        this.lifeTime = 4000;
        this.distanceToDissapear = 1440;
    }

    preUpdate(t, d){
        super.preUpdate(t, d);

        this.setVelocityX(-this.speed);
        this.setVelocityY(0);

        this.lifeTime -= d;
        if(this.lifeTime <= 0 
            || this.scene.player.x > this.x + this.distanceToDissapear
            || this.scene.player.x < this.x - this.distanceToDissapear){
            this.destroy();
        }
    }

    OnCollisionStay(body, other, event){
        if(!this.dead && other.gameObject && other.gameObject === this.scene.player){
            other.gameObject.Hurt();
        }
        this.destroy();
        this.dead = true;
    }
};