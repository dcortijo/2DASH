import Component from './Component.js';
import TriggerEnterMessage from './TriggerEnterMessage.js';
import TriggerStayMessage from './TriggerStayMessage.js';
export default class TriggerFlyerComponent extends Component{
    constructor(entity, triggers, speed){
        super(entity);
        this.triggers = triggers;//[]
        this.objective = 0;
        this.speed = speed;
    }

    update(time, delta){
      if(this.DistanceToObjective() > 0.2){
        this.MoveTowardsObjective(delta);
      }
    }

    receive(message){
        if(message instanceof TriggerStayMessage){
            if(message.other.gameObject === this.triggers[this.objective]){
                console.log("Next trigger");
                this.SetNextObjective();
            }
        }
    }

    SetNextObjective(){
        this.objective = (this.objective + 1) % this.triggers.length;
    }

    DistanceToObjective(){
        let vector = {x: this.entity.x - this.triggers[this.objective].x,
             y: this.entity.y - this.triggers[this.objective].y};
        return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    }

    MoveTowardsObjective(delta){
        let direction = {x: this.triggers[this.objective].x - this.entity.x, y: this.triggers[this.objective].y - this.entity.y};
        let magnitude = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2));
        direction = {x: direction.x / magnitude * this.speed, y: direction.y / magnitude * this.speed};
        magnitude = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2));
        this.entity.applyForce(direction);
    }
}