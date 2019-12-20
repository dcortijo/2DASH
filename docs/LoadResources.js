export default class LoadResources extends Phaser.Scene{
    constructor(keyname) {
        super({key: "Loading"});
    }
    preload() {
        this.load.image('playerImage', './img/Personaje1.png');
        this.load.image('backgroundNivel1', './img/BackgroundNivel1.jpg');
        this.load.image('backgroundNivel2', './img/BackgroundNivel2.jpg');
        this.load.image('backgroundNivel3', './img/BackgroundNivel3.jpg');
        this.load.image('patrones', './img/TilesetFirst.png');
        this.load.image('dronCiudadano', './img/DronCiudadano.png');
        this.load.image('boba', './img/Boba.png');
        this.load.tilemapTiledJSON('Nivel1', 'Nivel1.json');
        this.load.tilemapTiledJSON('Nivel2', 'Nivel2.json');
        this.load.tilemapTiledJSON('Nivel3', 'Nivel3.json');
        this.load.image('patrones', './img/TilesetFirst.png');
        this.load.image('patronesB', './img/TilesetBackground.png');
        this.load.image('patronesF', './img/TilesetForeground.png')
        this.load.image('collectible', './img/Collectible.png');
        this.load.image('cableD', './img/cableDefectuoso.png');
        this.load.image('platCrumb', './img/crumblingPlat.png');
        this.load.image('cristalRoto', './img/cristal.png');
        this.load.image('levelGoal', './img/bandera.png');
        this.load.image('results', './img/results.png');
        this.load.image('menu', './img/menu.png');
        this.load.spritesheet('healthMeter1', './img/Heart1.png', {
          frameWidth: 64,
          frameHeight: 32,
        });
        this.load.spritesheet('whipS', './img/WhipSheet.png', {frameWidth: 96, frameHeight: 32});
        this.load.spritesheet('playerRun', './img/MachFoxRunSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerJump', './img/MachFoxJumpin.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('electricity', './img/Electricity.png', {frameWidth: 32, frameHeight: 100});
        this.load.spritesheet('ratings', './img/ratings.png', {frameWidth: 100, frameHeight: 100});
        this.load.image('shooter', './img/NotSoSharpShooter.png');
        this.load.image('bullet', './img/Bullet.png');
        this.load.image('misiluro', './img/Misiluro.png');
        this.load.image('cannon', './img/MisiluroCannon.png');

        //Sonidos
        this.load.audio('hurt', './audio/pain.mp3');
        this.load.audio('jump', './audio/jump.mp3');
        this.load.audio('coin', './audio/collect(artisticdude).mp3');
        this.load.audio('menu', './audio/space(AlexanderZhelanov).mp3');
        this.load.audio('background', './audio/neocrey - Last Cyber Dance.mp3');
        this.load.audio('crack', './audio/TailWhip(Blender Foundation).mp3');
        this.load.audio('shut', './audio/MachinePowerOff.mp3');
        this.load.audio('shock', './audio/qubodupElectricityDamage02.mp3');
        this.load.audio('gun', './audio/Black Powder.wav');
        this.load.audio('victory', './audio/Victory.mp3')

        this.sound.add('hurt');
        this.sound.add('jump');
        this.sound.add('coin');
        this.sound.add('crack');
        this.sound.add('gun');
        this.sound.add('victory');
    }
    
    create(){
        //Animaciones
      this.anims.create({
        key: 'runRight',
        frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 4 }),
        frameRate: 10
      });
      this.anims.create({
        key: 'runLeft',
        frames: this.anims.generateFrameNumbers('playerRun', { start: 5, end: 9 }),
        frameRate: 10
      });
      this.anims.create({
        key: 'jumpRight',
        frames: this.anims.generateFrameNumbers('playerJump', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: 0
      });
      this.anims.create({
        key: 'jumpLeft',
        frames: this.anims.generateFrameNumbers('playerJump', { start: 1, end: 1 }),
        frameRate: 10,
        repeat: 0
      });
      this.anims.create({
        key: 'whip',
        frames: this.anims.generateFrameNumbers('whipS', { start: 0, end: 2 }),
        frameRate: 4
      });
      this.anims.create({
        key: 'zap',
        frames: this.anims.generateFrameNumbers('electricity', { start: 0, end: 4 }),
        frameRate: 5
      })

      this.scene.start('Menu');
    }
}