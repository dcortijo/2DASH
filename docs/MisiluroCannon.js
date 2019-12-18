import PhysSprite from './PhysSprite.js'
export default class MisiluroCannon extends PhysSprite{
    constructor(config){
        super(config);
        this.spawnDelay = config.spawnDelay;
        this.components = [];
    }
}