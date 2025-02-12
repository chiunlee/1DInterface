// --------------------------
// Animation Module
// --------------------------

// This animation object is used to highlight the correct cell (the one where the hider is hiding)
// after the guess has been made, using a fading effect.
let resultAnimation = {
  active: false,    // Is the animation currently active?
  timer: 0,         // Countdown timer for the animation (in frames)
  duration: 60,     // Total duration of the animation (e.g., 60 frames = 1 second at 60fps)
  alpha: 255        // Current transparency level for the highlight
};

// Starts the result animation by resetting the timer and opacity.
function startResultAnimation() {
  resultAnimation.active = true;
  resultAnimation.timer = resultAnimation.duration; // Reset timer to full duration.
  resultAnimation.alpha = 255;  // Start at full opacity.
}

// Updates the animation's timer and recalculates its transparency.
function updateAnimations() {
  if (resultAnimation.active) {
    resultAnimation.timer--;  // Decrease the timer each frame.
    // Map the timer value to an alpha value so that the highlight fades out.
    resultAnimation.alpha = map(resultAnimation.timer, 0, resultAnimation.duration, 0, 255);
    // When the timer reaches 0, disable the animation.
    if (resultAnimation.timer <= 0) {
      resultAnimation.active = false;
    }
  }
}

// Draws the fading highlight on the specified cell.
function drawResultAnimation(cellX, cellY, cellW, cellH) {
  if (resultAnimation.active) {
    noStroke();  // No border for the highlight.
    // Yellow color with the current alpha (transparency) value.
    fill(255, 255, 0, resultAnimation.alpha);
    rect(cellX, cellY, cellW, cellH);
  }
}
