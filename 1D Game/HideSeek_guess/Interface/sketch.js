// --------------------------
// p5.js Sketch Module
// --------------------------

// Called once when the program starts.
function setup() {
  createCanvas(600, 200); // Create a 600×200 pixel canvas.
  initGame();             // Initialize the game state, board, and players.
}

// Called continuously for rendering.
function draw() {
  background(0);          // Black background.
  updateAnimations();     // Update any active animations.
  drawGame();             // Draw the game board, guess markers, messages, or win animation.
}

// Called whenever a key is pressed.
function keyPressed() {
  handleKeyPressed();     // Process keyboard input.
}

// Mouse clicks are not used.
function mouseClicked() {
  handleMouseClicked();
}
