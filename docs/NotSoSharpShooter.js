import Enemy from './Enemy.js'
import ShooterComponent from './ShooterComponent.js'
import ActivateMessage from './ActivateMessage.js'
import DeactivateMessage from './DeactivateMessage.js'
export default class NotSoSharpShooter extends Enemy{
    constructor(config){ // config + {shootDelay}
        super(config);
        this.components = [new ShooterComponent(this, config.shootDelay, this.scene, config.flipX)];
        this.closeToPlayer = true;
        this.flipX = config.flipX;
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        this.components.forEach(element => {
            element.update(t, d);
        });

        if(this.scene.player.x > this.x + 2000
            || this.scene.player.x < this.x - 2000){
            if(!this.closeToPlayer){
                this.components.forEach(element => {
                    element.receive(new DeactivateMessage(this));
                });
                this.closeToPlayer = true;
            }
        } else {
            if(this.closeToPlayer){
                this.components.forEach(element => {
                    element.receive(new ActivateMessage(this));
                });
                this.closeToPlayer = false;
            }
        }
    }
}