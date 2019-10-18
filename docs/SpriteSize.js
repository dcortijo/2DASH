export default class SpriteSize extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, w, h, image){
        super(scene, x, y, image);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(0, 0);
        this.displayWidth = w;
        this.displayHeight = h;
    }

}