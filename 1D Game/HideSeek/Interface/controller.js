// --------------------------
// Controller Module
// --------------------------

// Define game states to manage the flow.
const STATE_HIDE   = 0;  // Hider chooses a cell to hide behind.
const STATE_GUESS  = 1;  // Seeker must guess the hider’s cell.
const STATE_RESULT = 2;  // Show the outcome of the guess and pause before the next round.
const STATE_WIN    = 3;  // A player has reached 5 wins – show win animation.

// Global player variables (initialized in initGame).
let player1, player2;

// Main game controller object to store settings and state.
let gameController = {
  state: STATE_HIDE,       // Start with the hider choosing a cell.
  boardSize: 10,           // Number of cells on the board.
  cellWidth: 0,            // Width of each cell (calculated from canvas width).
  hiddenCell: 0,           // The cell index chosen by the hider.
  guessedCell: -1,         // The cell index guessed by the seeker.
  message: "",             // Instruction or result message to be displayed.
  result: "",              // Outcome of the guess ("hit" or "miss").
  waitingTime: 0,          // Frames to wait in the result phase before continuing.
  currentHider: null,      // The player who is currently hiding.
  currentGuesser: null,    // The player who is currently guessing.
  winner: null,            // Set to the winning Player object when a win occurs.
  winAnimationProgress: 0  // Progress of the win animation (from 0 to 1).
};

// Initializes the game state, board dimensions, and creates players.
function initGame() {
  gameController.boardSize = 10;
  gameController.cellWidth = width / gameController.boardSize;
  
  // Create two players with different colors:
  // Player 1 uses red and Player 2 uses blue.
  player1 = new Player("Player 1", color(255, 0, 0));
  player2 = new Player("Player 2", color(0, 0, 255));
  
  // Assign roles: Player 1 hides, and Player 2 guesses.
  gameController.currentHider = player1;
  gameController.currentGuesser = player2;
  
  // Set a default hiding cell (starting at cell 0).
  gameController.hiddenCell = 0;
  gameController.state = STATE_HIDE;
  gameController.message = gameController.currentHider.name +
    ": Press a number key (0-" + (gameController.boardSize - 1) +
    ") to choose where to hide. (Press R to reset)";
  gameController.result = "";
  gameController.winner = null;
  gameController.winAnimationProgress = 0;
}

// Prepares for the next round by swapping the roles.
function nextRound() {
  // Swap the roles: the seeker becomes the new hider, and vice versa.
  let temp = gameController.currentHider;
  gameController.currentHider = gameController.currentGuesser;
  gameController.currentGuesser = temp;
  
  // Reset the hidden cell to a default value and clear the guessed cell.
  gameController.hiddenCell = 0;
  gameController.guessedCell = -1;
  gameController.state = STATE_HIDE;
  gameController.message = gameController.currentHider.name +
    ": Press a number key (0-" + (gameController.boardSize - 1) +
    ") to choose where to hide. (Press R to reset)";
  gameController.result = "";
}

// Handles key press events (for controlling and resetting).
function handleKeyPressed() {
  // Check for reset command (R or r) at any time.
  if (key === 'r' || key === 'R') {
    initGame();  // Reset the game.
    return;      // Skip any further key processing.
  }
  
  // Check if the pressed key is a digit (0-9).
  if (!isNaN(key) && key >= '0' && key <= '9') {
    let num = int(key);  // Convert the key string to an integer.
    
    // Process input based on the current game state.
    if (gameController.state === STATE_HIDE) {
      // Hider’s turn: set the hiding cell to the chosen number (if valid).
      if (num < gameController.boardSize) {
        gameController.hiddenCell = num;
        // Automatically transition to the guessing phase.
        gameController.state = STATE_GUESS;
        gameController.message = gameController.currentGuesser.name +
          ": Guess the hiding cell by pressing a number key (0-" +
          (gameController.boardSize - 1) + "). (Press R to reset)";
      }
    }
    else if (gameController.state === STATE_GUESS) {
      // Seeker’s turn: record the guessed cell.
      if (num < gameController.boardSize) {
        gameController.guessedCell = num;
        // Check if the guess is correct.
        if (gameController.guessedCell === gameController.hiddenCell) {
          gameController.result = "hit";
          gameController.currentGuesser.score++;  // Increase guesser’s score.
          // Check win condition for the guesser.
          if (gameController.currentGuesser.score >= 5) {
            gameController.state = STATE_WIN;
            gameController.winner = gameController.currentGuesser;
            gameController.winAnimationProgress = 0;
            gameController.message = "Winner: " + gameController.winner.name + " wins! (Press R to reset)";
            return;
          }
        } else {
          gameController.result = "miss";
          gameController.currentHider.score++;    // Increase hider’s score.
          // Check win condition for the hider.
          if (gameController.currentHider.score >= 5) {
            gameController.state = STATE_WIN;
            gameController.winner = gameController.currentHider;
            gameController.winAnimationProgress = 0;
            gameController.message = "Winner: " + gameController.winner.name + " wins! (Press R to reset)";
            return;
          }
        }
        // If no win condition is met, transition to the result phase.
        gameController.state = STATE_RESULT;
        gameController.message = "Result: " + gameController.result.toUpperCase() +
          "! " + gameController.currentHider.name + " was hiding at cell " +
          gameController.hiddenCell + ". (Press R to reset)";
        startResultAnimation();  // Start the highlight animation.
        gameController.waitingTime = 120;  // Set a pause duration (in frames).
      }
    }
    else if (gameController.state === STATE_RESULT) {
      // During the result phase, if the waiting time is over, a digit key can trigger the next round.
      if (gameController.waitingTime <= 0) {
        nextRound();
      }
    }
    else if (gameController.state === STATE_WIN) {
      // In the win state, number keys do nothing; wait for reset.
    }
  }
}

// (The mouse click control is no longer used because the game is entirely keyboard-driven.)
function handleMouseClicked() {
  // This function is intentionally left blank.
}

// Updates the game controller (e.g., counts down the waiting time in the result phase).
function updateGameController() {
  if (gameController.state === STATE_RESULT) {
    if (gameController.waitingTime > 0) {
      gameController.waitingTime--;
      // Once the waiting period is over, update the message.
      if (gameController.waitingTime <= 0) {
        gameController.message += " (Press any number key or R to continue)";
      }
    }
  }
  
  // If in win state, update the win animation progress.
  if (gameController.state === STATE_WIN) {
    // Increment winAnimationProgress gradually until it reaches 1.
    gameController.winAnimationProgress = min(gameController.winAnimationProgress + 0.01, 1);
  }
}
