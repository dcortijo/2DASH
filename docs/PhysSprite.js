export default class PhysSprite extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, w, h, image, gravity, trigger){
        super(scene, x, y, image);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = gravity;
        this.body.onCollide = !trigger;
        this.body.onOverlap = trigger;
        this.setOrigin(0, 0);
        this.displayWidth = w;
        this.displayHeight = h;
    }
}