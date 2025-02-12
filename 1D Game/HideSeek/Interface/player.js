// --------------------------
// Player Module
// --------------------------

// The Player class represents a player in the game.
class Player {
  /**
   * Constructs a new player.
   * @param {string} name - The player's name (e.g., "Player 1").
   * @param {p5.Color} col - The player's color (e.g., red or blue).
   */
  constructor(name, col) {
    this.name = name;   // Store the player's name.
    this.col = col;     // Store the player's color.
    this.score = 0;     // Initialize the player's score to 0.
  }
  
  /**
   * Returns the player's color.
   * @return {p5.Color} The color associated with the player.
   */
  color() {
    return this.col;
  }
}
