import PhysSprite from "./PhysSprite.js"
export default class StaticObj extends PhysSprite{

    constructor(scene, x, y, w, h, image){
        super(scene, x, y, w, h, image);
        this.setCollisionCategory(scene.staticObjs);
        this.setStatic(true);
    }
}