import Character from './Character.js';
export default class Enemy extends Character{
    constructor(config){
        super(config);
        this.setFixedRotation();
        //this.setFrictionAir(1);
        this.setFriction(1, 1, 1)
        /*this.body.inertia = Infinity;
        this.setMass(Infinity);
        console.log(this.body.inertia);
        this.body.setInertia(this.body, 10);*/
    }

    OnCollision(other){       
        if(other.gameObject && other.gameObject.Die){     
            other.gameObject.Die();
            console.log("¡Zasca!");
        } 
    }
}