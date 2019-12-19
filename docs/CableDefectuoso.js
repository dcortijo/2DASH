import PhysSprite from './PhysSprite.js'
export default class CableDefectuoso extends PhysSprite{
    constructor(config){
        super(config);
        this.coolDown = config.coolDown;
        this.hitBox = config.hitBox;
        this.timer = 0;
    }

    preUpdate(t, d){
        super.preUpdate(t, d);

        if(this.timer <= 0){
            this.timer = this.coolDown;
            this.scene.sound.play('shock');
            this.hitBox.Attack();
        } else this.timer = this.timer - d;
    }
}