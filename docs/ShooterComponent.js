import Component from './Component.js'
import ActivateMessage from './ActivateMessage.js';
import DeactivateMessage from './DeactivateMessage.js';
export default class ShooterComponent extends Component{
    constructor(entity, shootDelay, scene, createFunction, projectileDirection){
        super(entity);
        this.shootDelay = shootDelay;
        this.scene = scene;
        this.shootCooldown = 0;
        this.activated = true;
        this.createFunction = createFunction;
        this.projectileDirection = projectileDirection;
    }

    update(t, d){
        if(this.shootCooldown >= 0){
            this.shootCooldown -= d;
        } else {
            if(this.activated){
                this.shootCooldown = this.shootDelay;
                this.createFunction.call(this.scene, this.entity.x, this.entity.y, this.projectileDirection);
            }
        }
    }

    receive(message){
        if(message instanceof ActivateMessage){
            this.activated = true;
        } else if(message instanceof DeactivateMessage){
            this.activated = false;
        }
    }
}