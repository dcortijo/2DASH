export default class PlayerCamera extends Phaser.Cameras.Scene2D.Camera{
    constructor(config){ // config{x, y, width, height, bounds{x, y, width, height}, target, maxOffsetX, offsetY, repositionSpeed}
        super(config.x, config.y, config.width, config.height);
        this.setBounds(config.bounds.x, config.bounds.y, config.bounds.width, config.bounds.height);
        this.target = config.target;
        this.repositionSpeed = config.repositionSpeed;
        this.maxOffsetX = config.maxOffsetX;
        this.offsetY = config.offsetY;
        this.offsetX = 0;
        this.deadzone = new Phaser.Geom.Rectangle(-10, -100, 10, 100);
        this.startFollow(this.target, false, 1, 1, this.offsetX, this.offsetY);
    }

    preRender(resolution){

        if(this.prevTargetPosX < this.target.x && this.offsetX > -this.maxOffsetX){
            this.offsetX -= this.repositionSpeed;
        } else if(this.prevTargetPosX > this.target.x && this.offsetX < this.maxOffsetX){
            this.offsetX += this.repositionSpeed;
        }

        this.setFollowOffset(this.offsetX, this.offsetY);
        this.prevTargetPosX = this.target.x;

        super.preRender(resolution);
    }
}