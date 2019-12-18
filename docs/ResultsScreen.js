export default class ResultsScreen extends Phaser.Scene{
    constructor(keyname) {
        super('ResultsScreen');
    }

    create(data){

      let background = this.add.image(-100, 0, 'results');
      background.setOrigin(0, 0);
      background.displayWidth = 1640;
      background.displayHeight = 810;

      //Score
      this.score = data.score;
      this.scoreText = this.add.text(200, 250, "TOTAL SCORE: " + this.score, {fill: "#aa00ff"}).setFontSize(40);

      //Time
      this.timeNum = data.time;
      this.timerText = this.add.text(800, 250, "TOTAL TIME: " + (Math.round(this.timeNum/1000)), {fill: "#aa00ff"}).setFontSize(40);
      
      //Final Score
      this.score = data.score;
      this.scoreText = this.add.text(500, 450, "FINAL RATING: " + (Math.round((this.score * 1000) / this.timeNum)), {fill: "#aa00ff"}).setFontSize(40);
    }
}