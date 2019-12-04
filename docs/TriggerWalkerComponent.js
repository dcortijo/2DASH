import TriggerFlyerCompoent from './TriggerFlyerComponent.js';
import TriggerEnterMessage from './TriggerEnterMessage.js';
import TriggerStayMessage from './TriggerStayMessage.js';
export default class TriggerWalkerComponent extends TriggerFlyerCompoent{
    constructor(entity, triggers, speed){
        super(entity, triggers, speed);
    }

    MoveTowardsObjective(delta){
        let direction = Math.min(Math.max(this.triggers[this.objective].x - this.entity.x, -1), 1);
        direction = direction * this.speed;
        this.entity.applyForce({x: direction, y: 0});
    }
}