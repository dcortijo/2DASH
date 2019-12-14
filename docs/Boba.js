import TriggerWalkerComponent from './TriggerWalkerComponent.js';
import TriggerStayMessage from './TriggerStayMessage.js';
import Enemy from './Enemy.js';
export default class Boba extends Enemy{
    constructor(config){ // config + {objectives[], speed}
        super(config);
        this.components = [new TriggerWalkerComponent(this, config.objectives, config.speed)];
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