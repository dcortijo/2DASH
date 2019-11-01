export default class PhysSprite extends Phaser.Physics.Matter.Sprite{

    constructor(config){ // config{scene, x, y, w, h, hasGravity, isStatic, image, body{type, width, height}, isSensor}
        super(config.scene.matter.world, config.x, config.y, config.image);
        config.scene.add.existing(this);
        this.setOrigin(0, 0);
        this.displayWidth = config.w;
        this.displayHeight = config.h;
        this.setBody(config.body);
        this.setIgnoreGravity(!config.hasGravity);
        this.setStatic(config.isStatic);
        this.setSensor(config.isSensor);
    }

    OnCollision(other){

    }

    OnTrigger(other){
        
    }
}