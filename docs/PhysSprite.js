export default class PhysSprite extends Phaser.Physics.Matter.Sprite{

    constructor(config){ // config{scene, x, y, w, h, hasGravity, image, body{parts[{..., isSensor}], inertia}, isStatic, label}
        super(config.scene.matter.world, config.x, config.y, config.image);
        config.scene.add.existing(this);
        this.setOrigin(0, 0);
        this.displayWidth = config.w;
        this.displayHeight = config.h;
        let compuesto = Phaser.Physics.Matter.Matter.Body.create(config.body);
        this.setExistingBody(compuesto);
        this.setIgnoreGravity(!config.hasGravity);
        this.setStatic(config.isStatic);
        this.label = config.label;
    }

    OnCollisionStart(body, other, event){
        
    }

    OnTriggerStart(body, other){

    }

    OnTriggerEnd(body, other){

    }

    OnCollisionEnd(body, other, event){

    }

    OnTriggerStay(body, other){

    }

    OnCollisionStay(body, other, event){

    }
}