// display.js
// Responsible for rendering the game: the row of square tiles, the center highlight,
// the player markers, and the moving tug-of-war marker.
class Display {
  constructor(size, pixelSize) {
    // Total number of tiles (we use 31 for a center tile at index 15).
    this.size = size;
    // Width (and height) of each square tile.
    this.pixelSize = pixelSize;
    // Calculate the center tile index.
    this.centerIndex = floor(size / 2);
  }

  // Draws the entire display.
  // currentMidpoint: the current marker position (0 to maxPosition).
  // maxPosition: the maximum marker value (30).
  // gameState: "PLAY" or "SCORE".
  // winner: the winning color (if any).
  show(currentMidpoint, maxPosition, gameState, winner) {
    if (gameState === "SCORE") {
      // In SCORE state, fill every tile with the winner's color.
      noStroke();
      for (let i = 0; i < this.size; i++) {
        fill(winner);
        rect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
      }
    } else {
      // --- PLAY state: Draw the grid of tiles ---
      
      // Draw each tile with a black fill and a white border.
      for (let i = 0; i < this.size; i++) {
        fill(0);       // Black fill.
        stroke(255);   // White border.
        rect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
      }

      // Highlight the center tile with a thicker white border.
      stroke(255);
      strokeWeight(3);
      noFill();
      rect(this.centerIndex * this.pixelSize, 0, this.pixelSize, this.pixelSize);
      strokeWeight(1);

      // --- Draw the player markers ---
      // A smaller square inside the leftmost tile for Player 1 (blue).
      let padding = this.pixelSize * 0.2;
      fill(0, 0, 255);
      noStroke();
      rect(0 + padding, 0 + padding, this.pixelSize - 2 * padding, this.pixelSize - 2 * padding);

      // A similar square inside the rightmost tile for Player 2 (red).
      fill(255, 0, 0);
      rect((this.size - 1) * this.pixelSize + padding, 0 + padding, this.pixelSize - 2 * padding, this.pixelSize - 2 * padding);

      // --- Draw the moving tug-of-war marker ---
      // Compute marker color as a mix between blue and red depending on its position.
      // When the marker is in the center, the color is an even mix (purple);
      // moving left makes it bluer, moving right makes it redder.
      let amt = currentMidpoint / maxPosition;  // 0 (left) to 1 (right).
      let markerColor = lerpColor(color(0, 0, 255), color(255, 0, 0), amt);
      
      // Draw the marker as a rectangle with the computed stroke color.
      stroke(markerColor);
      strokeWeight(3);
      noFill();
      rect(currentMidpoint * this.pixelSize, 0, this.pixelSize, this.pixelSize);
      strokeWeight(1);
    }
  }
}
