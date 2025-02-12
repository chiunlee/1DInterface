// --------------------------
// Player Module
// --------------------------

// The Player class represents a game player.
class Player {
  /**
   * Constructs a new player.
   * @param {string} name - The player's name (e.g., "Player 1").
   * @param {p5.Color} col - The player's color (e.g., red or blue).
   */
  constructor(name, col) {
    this.name = name;   // Player's name.
    this.col = col;     // Player's color.
    this.score = 0;     // Player's score, starting at 0.
  }
  
  /**
   * Returns the player's color.
   * @return {p5.Color} The player's color.
   */
  color() {
    return this.col;
  }
}
