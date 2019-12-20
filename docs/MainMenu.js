export default class LoadResources extends Phaser.Scene{
    constructor(keyname) {
        super({key: 'Menu'});
    }

    preload(){
        this.input = this.input.keyboard.addKeys('ENTER');
        this.input.ENTER.on('down', event =>{this.startGame()});
    }

    create(){
        // Background
      let background = this.add.image(-100, 0, 'menu');
      background.setOrigin(0, 0);
      background.displayWidth = 1640;
      background.displayHeight = 810;
      background.setScrollFactor(0);

      this.menu = this.sound.add('menu');
      this.menu.play();

    }

    startGame(){
        this.menu.stop();
        this.music = this.sound.add('background', {loop: true});
        this.music.play();
        this.scene.start('Nivel1', {music: this.music});
    }
}