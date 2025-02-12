// controller.js
// Manages the game logic and state for the tug-of-war game.
class Controller {
    constructor() {
      // The game starts in the PLAY state.
      this.gameState = "PLAY";
      // The tug-of-war marker starts in the center (15 out of 0–30).
      this.midpoint = 15;
      // The maximum marker value (0 to 30 gives 31 positions/tiles).
      this.maxPosition = 30;
      // Holds the winning color once a win condition is met.
      this.winner = null;
      // Delay counter (in frames) for showing the win before reset.
      this.winDelay = 0;
    }
  
    update() {
      if (this.gameState === "PLAY") {
        // Constrain the marker to the allowed range.
        this.midpoint = constrain(this.midpoint, 0, this.maxPosition);
  
        // Check win conditions.
        if (this.midpoint <= 0) {
          this.winner = color(0, 0, 255); // Blue wins (Player 1).
          this.gameState = "SCORE";
          this.winDelay = 60; // Delay for 60 frames (about 1 second).
        } else if (this.midpoint >= this.maxPosition) {
          this.winner = color(255, 0, 0); // Red wins (Player 2).
          this.gameState = "SCORE";
          this.winDelay = 60;
        }
      } else if (this.gameState === "SCORE") {
        // In the SCORE state, count down until a reset.
        this.winDelay--;
        if (this.winDelay <= 0) {
          this.reset();
        }
      }
    }
  
    // Move the marker left (for Player 1) when in PLAY state.
    moveLeft() {
      if (this.gameState === "PLAY") this.midpoint--;
    }
  
    // Move the marker right (for Player 2) when in PLAY state.
    moveRight() {
      if (this.gameState === "PLAY") this.midpoint++;
    }
  
    // Reset the game back to the initial state.
    reset() {
      this.midpoint = parseInt(this.maxPosition / 2);
      this.winner = null;
      this.gameState = "PLAY";
    }
  }
  