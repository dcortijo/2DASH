import Component from './Component.js'
export default class MoveInDirectionComponent extends Component{
    constructor(entity, direction){
        super(entity);
        this.direction = direction;
        this.activated = true;
    }

    update(t, d){
        if(this.activated){
            this.entity.x += this.direction.x * d;
            this.entity.y += this.direction.y * d;
        }
    }

    receive(message){
    }
}