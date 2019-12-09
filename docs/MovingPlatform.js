import PhysSprite from './PhysSprite.js';
import TriggerFlyerComponent from './TriggerFlyerComponent.js';
import TriggerStayMessage from './TriggerStayMessage.js';
export default class MovingPlatform extends PhysSprite{
    constructor(config){ // config + {objectives[], speed}
        super(config);
        this.setFriction(1, 1, 1);
        this.components = [new TriggerFlyerComponent(this, config.objectives, config.speed)];
    }

    OnTriggerStay(body, other){
        super.OnTriggerStay(body, other);
        this.components.forEach(element => {
            element.receive(new TriggerStayMessage(this, body, other));
        });
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.components.forEach(element => {
            element.update(time, delta);
        });
    }
}