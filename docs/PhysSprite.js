export default class PhysSprite extends Phaser.Physics.Matter.Sprite{

    constructor(config){ // config{scene, x, y, w, h, gravity, static, image, body{type, width, height}}
        super(config.scene.matter.world, config.x, config.y, config.image);
        config.scene.add.existing(this);
        this.setOrigin(0, 0);
        this.displayWidth = config.w;
        this.displayHeight = config.h;
        this.setBody(config.body);
        this.setIgnoreGravity(!config.gravity);
        this.setStatic(config.static);
    }

    OnCollision(other){

    }

    OnTrigger(other){
        
    }
}