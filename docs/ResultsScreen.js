export default class ResultsScreen extends Phaser.Scene{
    constructor(keyname) {
        super('ResultsScreen');
    }

    create(data){
      //Score
      this.score = data.score;
      this.scoreText = this.add.text(200, 150, "TOTAL SCORE: " + this.score, {fill: "#ffffff"}).setFontSize(40);

      //Time
      this.timeNum = data.time;
      this.timerText = this.add.text(1000, 150, "TOTAL TIME: " + (Math.round(this.timeNum/1000)), {fill: "#ffffff"}).setFontSize(40);
      
      //Final Score
      this.score = data.score;
      this.scoreText = this.add.text(600, 300, "FINAL RATING: " + (Math.round((this.score * 1000) / this.timeNum)), {fill: "#ffffff"}).setFontSize(40);
    }
}