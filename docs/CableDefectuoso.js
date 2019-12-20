import PhysSprite from './PhysSprite.js'
export default class CableDefectuoso extends PhysSprite{
    constructor(config){
        super(config);
        this.coolDown = config.coolDown;
        this.hitBox = config.hitBox;
        this.timer = this.coolDown / 2;
    }

    preUpdate(t, d){
        super.preUpdate(t, d);

        if((this.scene.player.x > this.x - 1000
        && this.scene.player.x < this.x + 1000) && 
        (this.scene.player.y > this.y - 512
        && this.scene.player.y < this.y + 512)){
            if(this.timer <= 0){
                this.timer = this.coolDown;
                this.scene.sound.play('shock');
                //this.scene.playMultipleSound('shock');
                this.hitBox.Attack();
            } else this.timer = this.timer - d;
        }
    }
}