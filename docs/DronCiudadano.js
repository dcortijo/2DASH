import Enemy from './Enemy.js';
import TriggerFollowerComponent from './TriggerFollowerComponent.js';
import TriggerStayMessage from './TriggerStayMessage.js';
export default class DronCiudadano extends Enemy{
    constructor(config){ // config + {objectives[], speed}
        super(config);
        this.components = [new TriggerFollowerComponent(this, config.objectives, config.speed)];
    }

    OnTriggerStay = function(body, other){
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