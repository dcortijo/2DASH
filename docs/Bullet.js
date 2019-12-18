import PhysSprite from './PhysSprite.js';
import MoveInDirectionComponent from './MoveInDirectionComponent.js'
export default class Bullet extends PhysSprite{
    constructor(config){ // config + { speed }
        super(config);
        this.speed = config.speed;
        this.lifeTime = 4000;
        this.distanceToDissapear = 1440;
        this.components = [new MoveInDirectionComponent(this, config.direction)];
        this.flipX = config.direction.x > 0;
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        this.components.forEach(element =>{
            element.update(t, d);
        });

        if(this.scene.player.x > this.x + 2000
            || this.scene.player.x < this.x - 2000){
            this.destroy();
        }

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