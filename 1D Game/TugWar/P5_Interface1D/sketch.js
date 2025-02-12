// sketch.js
// Main p5.js sketch that sets up the canvas, updates the game logic,
// renders the display, and handles player input.

let displaySize = 31;  // Using 31 tiles (with center at index 15)
let pixelSize = 20;
let controller;
let display;

function setup() {
  // Create a canvas wide enough for all tiles and extra space for UI text.
  createCanvas(displaySize * pixelSize, pixelSize + 40);
  controller = new Controller();
  display = new Display(displaySize, pixelSize);
  
  // Set text properties: white text, monospaced font, centered.
  textSize(20);
  textFont('monospace');
  textAlign(CENTER);
}

function draw() {
  background(0);  // Black background.
  
  // Update game logic.
  controller.update();
  
  // Draw the tug-of-war field.
  display.show(
    controller.midpoint, 
    controller.maxPosition,
    controller.gameState,
    controller.winner
  );
  
  // Draw UI text in white below the playing area.
  fill(255);
  text("Player 1 (A) - Blue", width / 4, height - 10);
  text("Player 2 (L) - Red", (3 * width) / 4, height - 10);
  
  // When in SCORE state, display the win message.
  if (controller.gameState === "SCORE") {
    fill(255);
    textSize(32);
    let winText = (red(controller.winner) === 0 && blue(controller.winner) === 255) ?
      "BLUE WINS!" : "RED WINS!";
    text(winText, width / 2, pixelSize + 30);
    textSize(20);
  }
}

// Handle key presses:
// - 'A' or 'a' moves the marker left (Player 1).
// - 'L' or 'l' moves the marker right (Player 2).
// - 'R' or 'r' resets the game.
function keyPressed() {
  if (key === 'A' || key === 'a') controller.moveLeft();
  if (key === 'L' || key === 'l') controller.moveRight();
  if (key === 'R' || key === 'r') controller.reset();
}
