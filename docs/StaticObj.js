import PhysSprite from "./PhysSprite.js"
export default class StaticObj extends PhysSprite{

    constructor(scene, x, y, w, h, image, gravity, trigger){
        super(scene, x, y, w, h, image, gravity, trigger);
        scene.staticObjs.add(scene.add.existing(this));
        this.body.setImmovable(true);
    }
}