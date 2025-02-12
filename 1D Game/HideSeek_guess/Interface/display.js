// --------------------------
// Display Module
// --------------------------

// Draws the game board, guess markers (with percentage colours), messages, and win animation.
function drawGame() {
  // Update any waiting periods or win animation progress.
  updateGameController();
  
  // If in win state, perform win animation.
  if (gameController.state === STATE_WIN) {
    let boardSize = gameController.boardSize;
    let cellWidth = gameController.cellWidth;
    let cellHeight = 50;
    let startX = 0;
    let startY = height / 2 - cellHeight / 2;
    
    // Compute the center and maximum distance from center.
    let center = (boardSize - 1) / 2;
    let maxDistance = 0;
    for (let i = 0; i < boardSize; i++) {
      let d = abs(i - center);
      if (d > maxDistance) maxDistance = d;
    }
    // Timing: cells farther from the center start fading later.
    let totalDelay = 0.5;   // Delay factor.
    let fadeDuration = 0.5; // Duration for the fade effect.
    
    // Draw each cell with an interpolated color.
    for (let i = 0; i < boardSize; i++) {
      let d = abs(i - center);
      let cellDelay = (d / maxDistance) * totalDelay;
      let cellProgress = constrain((gameController.winAnimationProgress - cellDelay) / fadeDuration, 0, 1);
      let winnerColor = gameController.winner.color();
      let cellColor = lerpColor(color(0), winnerColor, cellProgress);
      stroke(255);
      fill(cellColor);
      rect(startX + i * cellWidth, startY, cellWidth, cellHeight);
    }
    
    // Display winning message.
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Winner: " + gameController.winner.name + " wins! (Press R to reset)", width / 2, height - 20);
    
    // Display current scores.
    textAlign(LEFT, TOP);
    text("Player 1 (Hider): " + player1.score, 10, 10);
    text("Player 2 (Guesser): " + player2.score, 10, 30);
    
    return;
  }
  
  // Normal game drawing.
  let boardSize = gameController.boardSize;
  let cellWidth = gameController.cellWidth;
  let cellHeight = 50;
  let startX = 0;
  let startY = height / 2 - cellHeight / 2;
  
  // Draw the board: black cells with white outlines.
  stroke(255);
  for (let i = 0; i < boardSize; i++) {
    fill(0);
    rect(startX + i * cellWidth, startY, cellWidth, cellHeight);
  }
  
  // In STATE_RESULT, reveal Player 1's hidden cell.
  if (gameController.state === STATE_RESULT) {
    let hx = startX + gameController.hiddenCell * cellWidth;
    fill(player1.color());
    rect(hx, startY, cellWidth, cellHeight);
  }
  
  // Draw guess markers for each wrong guess.
  // Iterate through the guesses array.
  for (let i = 0; i < gameController.guesses.length; i++) {
    let guessObj = gameController.guesses[i];
    let guessIndex = guessObj.guess;
    let closeness = guessObj.closeness; // 1 = perfect; lower values mean worse.
    let gx = startX + guessIndex * cellWidth;
    
    if (guessIndex === gameController.hiddenCell && closeness === 1) {
      // Correct guess marker: display a check mark.
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text("✓", gx + cellWidth / 2, startY + cellHeight / 2);
    } else {
      // Wrong guess: fill the cell with a color based on closeness.
      // Closeness is mapped from red (0%) to green (100%).
      let badColor = color(255, 0, 0);
      let goodColor = color(0, 255, 0);
      let guessColor = lerpColor(badColor, goodColor, closeness);
      fill(guessColor);
      rect(gx, startY, cellWidth, cellHeight);
      // Overlay the closeness percentage.
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(16);
      let percent = floor(closeness * 100);
      text(percent + "%", gx + cellWidth / 2, startY + cellHeight / 2);
    }
  }
  
  // Display the current message at the bottom.
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(gameController.message, width / 2, height - 20);
  
  // Display the current scores in the upper left.
  textAlign(LEFT, TOP);
  text("Player 1 (Hider): " + player1.score, 10, 10);
  text("Player 2 (Guesser): " + player2.score, 10, 30);
}
