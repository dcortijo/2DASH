import PhysSprite from './PhysSprite.js';
export default class Character extends PhysSprite{
    constructor(config) { // config
      super(config);
      this.setFixedRotation();
      }
    
    Die(){
      this.destroy();
    }
  }