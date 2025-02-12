// --------------------------
// Display Module
// --------------------------

// Draws the game board, players’ indicators, and messages.
function drawGame() {
  // First, update any waiting periods or win animation progress.
  updateGameController();
  
  // If in win state, display the win animation.
  if (gameController.state === STATE_WIN) {
    let boardSize = gameController.boardSize;
    let cellWidth = gameController.cellWidth;
    let cellHeight = 50;  // Fixed height for each cell.
    let startX = 0;
    let startY = height / 2 - cellHeight / 2;  // Center the board vertically.
    
    // For smooth win animation: each cell will fade from black to the winner's color.
    // Calculate the "center" position (as a fractional index) and the maximum distance.
    let center = (boardSize - 1) / 2;
    let maxDistance = 0;
    for (let i = 0; i < boardSize; i++) {
      let d = abs(i - center);
      if (d > maxDistance) maxDistance = d;
    }
    // Define animation timing: cells farther from center will start fading later.
    let totalDelay = 0.5;     // Fraction of total animation time to delay the farthest cell.
    let fadeDuration = 0.5;   // Duration for the fade effect per cell.
    
    // Draw each cell with a color interpolated from black to the winning player's color.
    for (let i = 0; i < boardSize; i++) {
      let d = abs(i - center);
      // Compute the delay for this cell relative to its distance.
      let cellDelay = (d / maxDistance) * totalDelay;
      // Determine the cell's individual progress (from 0 to 1) once its delay has passed.
      let cellProgress = constrain((gameController.winAnimationProgress - cellDelay) / fadeDuration, 0, 1);
      let winnerColor = gameController.winner.color();
      // Interpolate between black and the winning player's color.
      let cellColor = lerpColor(color(0), winnerColor, cellProgress);
      stroke(255);  // White outline.
      fill(cellColor);
      rect(startX + i * cellWidth, startY, cellWidth, cellHeight);
    }
    
    // Display the winning message at the bottom.
    fill(255);  // White text.
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Winner: " + gameController.winner.name + " wins! (Press R to reset)", width / 2, height - 20);
    
    // Display the current scores in the upper left corner.
    textAlign(LEFT, TOP);
    text("Player 1 (Red): " + player1.score, 10, 10);
    text("Player 2 (Blue): " + player2.score, 10, 30);
    
    // Skip the rest of the drawing.
    return;
  }
  
  // Normal game drawing (when not in win state):
  let boardSize = gameController.boardSize;
  let cellWidth = gameController.cellWidth;
  let cellHeight = 50;  // Fixed height for each cell.
  let startX = 0;
  let startY = height / 2 - cellHeight / 2;  // Center the board vertically.
  
  // Draw the board cells: black fill with white outline.
  stroke(255);    // White outline.
  for (let i = 0; i < boardSize; i++) {
    fill(0);      // Black fill.
    rect(startX + i * cellWidth, startY, cellWidth, cellHeight);
  }
  
  // In the HIDE phase, show the hider's cell in their color.
  if (gameController.state === STATE_HIDE) {
    let x = startX + gameController.hiddenCell * cellWidth;
    fill(gameController.currentHider.color());
    rect(x, startY, cellWidth, cellHeight);
  }
  
  // In the RESULT phase, reveal the hider’s cell and show an indicator for the guess.
  if (gameController.state === STATE_RESULT) {
    // Draw the hider’s cell.
    let x = startX + gameController.hiddenCell * cellWidth;
    fill(gameController.currentHider.color());
    rect(x, startY, cellWidth, cellHeight);
    
    // If a guess has been made, display the guess indicator.
    let gx = startX + gameController.guessedCell * cellWidth;
    fill(255);  // White text.
    textAlign(CENTER, CENTER);
    textSize(32);
    if (gameController.result === "hit") {
      // Display a check mark for a hit.
      text("✓", gx + cellWidth / 2, startY + cellHeight / 2);
    } else {
      // Display an uppercase "X" for a miss.
      text("X", gx + cellWidth / 2, startY + cellHeight / 2);
    }
    // Draw the animated highlight on the correct cell.
    drawResultAnimation(x, startY, cellWidth, cellHeight);
  }
  
  // Display the current instruction or result message at the bottom.
  fill(255);  // White text.
  textSize(16);
  textAlign(CENTER, CENTER);
  text(gameController.message, width / 2, height - 20);
  
  // Display the current scores in the upper left corner.
  textAlign(LEFT, TOP);
  text("Player 1 (Red): " + player1.score, 10, 10);
  text("Player 2 (Blue): " + player2.score, 10, 30);
}
