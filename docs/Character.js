import PhysSprite from './PhysSprite.js';
export default class Character extends PhysSprite{
    constructor(config) { // config
      super(config);
      }
    
    Die(){
      this.destroy();
    }
  }