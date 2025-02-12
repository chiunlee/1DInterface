// --------------------------
// Animation Module
// --------------------------

// This animation object is used to highlight a cell (if needed) with a fading effect.
// (In this version we mostly use colored markers on wrong guesses and a win animation.)
let resultAnimation = {
  active: false,    // Is the animation active?
  timer: 0,         // Countdown timer for the animation (in frames)
  duration: 60,     // Total duration (e.g., 60 frames = 1 second at 60fps)
  alpha: 255        // Current transparency level
};

// Starts the result animation (not used heavily in the deduct version)
function startResultAnimation() {
  resultAnimation.active = true;
  resultAnimation.timer = resultAnimation.duration;
  resultAnimation.alpha = 255;
}

// Updates the result animation (if active)
function updateAnimations() {
  if (resultAnimation.active) {
    resultAnimation.timer--;
    resultAnimation.alpha = map(resultAnimation.timer, 0, resultAnimation.duration, 0, 255);
    if (resultAnimation.timer <= 0) {
      resultAnimation.active = false;
    }
  }
}

// Draws the fading highlight on a given cell (if active)
function drawResultAnimation(cellX, cellY, cellW, cellH) {
  if (resultAnimation.active) {
    noStroke();
    fill(255, 255, 0, resultAnimation.alpha);
    rect(cellX, cellY, cellW, cellH);
  }
}
