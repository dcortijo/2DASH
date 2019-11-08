export default class PlayerCamera extends Phaser.Cameras.Scene2D. Camera{
    constructor(config){ // config{x, y, width, height, bounds{x, y, width, height}, target, maxOffsetX, offsetY, repositionSpeed}
        super(config.x, config.y, config.width, config.height);
        this.setBounds(config.bounds.x, config.bounds.y, config.bounds.width, config.bounds.height);
        this.target = config.target;
        this.repositionSpeed = config.repositionSpeed;
        this.maxOffsetX = config.maxOffsetX;
        this.offsetY = config.offsetY;
        this.startFollow(config.target, false, 1, 1, 0, config.offsetY);
        this.deadzone = new Phaser.Geom.Rectangle(-20, -100, 20, 100);
    }

    preUpdate(){
        
    }
}