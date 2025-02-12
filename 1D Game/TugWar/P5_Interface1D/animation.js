// animation.js
// (No longer used in this version of the game.)
class Animation {
    constructor(winnerColor) {
      this.winnerColor = winnerColor;
      this.flashFrames = 30;
      this.currentFrame = 0;
    }
  
    update() {
      if (this.currentFrame < this.flashFrames) {
        this.currentFrame++;
      }
    }
  
    getColor() {
      const alpha = map(sin(this.currentFrame * 0.2), -1, 1, 50, 255);
      return color(
        red(this.winnerColor),
        green(this.winnerColor),
        blue(this.winnerColor),
        alpha
      );
    }
  
    isDone() {
      return this.currentFrame >= this.flashFrames;
    }
  }
  