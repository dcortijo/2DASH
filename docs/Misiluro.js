import Enemy from './Enemy.js'
import MoveInDirectionComponent from './MoveInDirectionComponent.js';
export default class Misiluro extends Enemy{
    constructor(config){
        super(config);
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
    }

    OnTriggerStay(body, other){
        if(!this.dead){
            if(other.gameObject && other.gameObject.label === 'player'){
                if(this.colliding){
                    if(body === this.triggerLeft){
                        other.gameObject.PushLeft();
                    } else if(body === this.triggerRight){
                        other.gameObject.PushRight();
                    }
                    this.destroy();
                    this.dead = true;
                }
            }
            if(body === this.triggerTop && other.gameObject.GetFeet && other.gameObject.GetFeet() === other){
                other.gameObject.BoostJump();
                this.Die();
            }
        }
    }
}