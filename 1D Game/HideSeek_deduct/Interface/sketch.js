// --------------------------
// p5.js Sketch Module
// --------------------------

// setup() is called once when the program starts.
function setup() {
  createCanvas(600, 200);  // Create a canvas 600 pixels wide and 200 pixels tall.
  initGame();              // Initialize the game state, board, and players.
}

// draw() is called continuously and is used to render the game.
function draw() {
  background(0);           // Black background for the UI.
  updateAnimations();      // Update any active animations (e.g., the result highlight).
  drawGame();              // Render the game board, players, messages, or win animation.
}

// keyPressed() is called whenever a key is pressed.
function keyPressed() {
  handleKeyPressed();      // Process key input for game control.
}

// Since the game now uses only the keyboard, mouse clicks are not processed.
function mouseClicked() {
  handleMouseClicked();    // (This function is intentionally left empty.)
}
