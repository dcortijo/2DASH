import PhysSprite from './PhysSprite.js';
export default class TriggerObj extends PhysSprite{

    constructor(scene, x, y, w, h, image){
        super(scene, x, y, w, h, image, false, true);
        scene.triggers.add(scene.add.existing(this));
        this.body.setImmovable(true);
    }
}