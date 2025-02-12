// --------------------------
// Controller Module
// --------------------------

// Define game states.
const STATE_HIDE   = 0;  // Player 1 (Hider) chooses where to hide.
const STATE_GUESS  = 1;  // Player 2 (Guesser) has up to 3 tries.
const STATE_RESULT = 2;  // Round result is shown.
const STATE_WIN    = 3;  // A player has reached 5 wins – win animation.

// Global player variables.
let player1, player2;

// Main game controller object.
let gameController = {
  state: STATE_HIDE,       // Initial state.
  boardSize: 10,           // Number of cells in the row.
  cellWidth: 0,            // Calculated based on canvas width.
  hiddenCell: 0,           // The cell chosen by the hider.
  guessCount: 0,           // How many guesses have been made this round.
  guesses: [],             // Array to record wrong guesses [{ guess: number, closeness: number }, ...].
  message: "",             // Instruction or result message.
  result: "",              // "hit" or "miss" for the round.
  waitingTime: 0,          // (Optional waiting period.)
  winner: null,            // Set when a player reaches 5 wins.
  winAnimationProgress: 0  // For win animation progress (0 to 1).
};

// Initializes the game state, board dimensions, and players.
function initGame() {
  gameController.boardSize = 10;
  gameController.cellWidth = width / gameController.boardSize;
  
  // Create players.
  // Player 1 is the Hider; Player 2 is the Guesser.
  player1 = new Player("Player 1", color(255, 0, 0));  // Red.
  player2 = new Player("Player 2", color(0, 0, 255));  // Blue.
  
  // Set the initial state: Hider chooses a hiding cell.
  gameController.state = STATE_HIDE;
  gameController.hiddenCell = 0;
  gameController.guessCount = 0;
  gameController.guesses = [];
  gameController.message = "Player 1 (Hider): Press a number key (0-9) to choose where to hide. (Press R to reset)";
  gameController.result = "";
  gameController.winner = null;
  gameController.winAnimationProgress = 0;
}

// Prepares for the next round (roles remain the same in this version).
function nextRound() {
  gameController.state = STATE_HIDE;
  gameController.hiddenCell = 0;
  gameController.guessCount = 0;
  gameController.guesses = [];
  gameController.message = "Player 1 (Hider): Press a number key (0-9) to choose where to hide. (Press R to reset)";
  gameController.result = "";
}

// Handles key press events.
function handleKeyPressed() {
  // Reset the game if R (or r) is pressed.
  if (key === 'r' || key === 'R') {
    initGame();
    return;
  }
  
  // Process input based on the current state.
  if (gameController.state === STATE_HIDE) {
    // Player 1 chooses the hiding cell.
    if (!isNaN(key) && key >= '0' && key <= '9') {
      let num = int(key);
      if (num < gameController.boardSize) {
        gameController.hiddenCell = num;
        // Transition to the guessing phase.
        gameController.state = STATE_GUESS;
        gameController.message = "Player 2 (Guesser): Guess the hiding cell by pressing a number key (0-" +
          (gameController.boardSize - 1) + "). You have 3 tries.";
      }
    }
  }
  else if (gameController.state === STATE_GUESS) {
    // Player 2 makes a guess.
    if (!isNaN(key) && key >= '0' && key <= '9') {
      let num = int(key);
      if (num < gameController.boardSize) {
        let distance = abs(num - gameController.hiddenCell);
        let maxDistance = gameController.boardSize - 1; // Maximum possible difference.
        let closeness = 1 - (distance / maxDistance);   // 1 = perfect; 0 = worst.
        
        if (num === gameController.hiddenCell) {
          // Correct guess.
          gameController.guesses.push({ guess: num, closeness: 1 });
          gameController.result = "hit";
          gameController.state = STATE_RESULT;
          gameController.message = "Correct! You guessed it in " + (gameController.guessCount + 1) + " try" + ((gameController.guessCount+1) === 1 ? "" : "ies") + ".";
          player2.score++;
          // Check win condition.
          if (player2.score >= 5) {
            gameController.state = STATE_WIN;
            gameController.winner = player2;
            gameController.winAnimationProgress = 0;
            gameController.message = "Winner: " + player2.name + " wins! (Press R to reset)";
          }
        } else {
          // Wrong guess: record it.
          gameController.guesses.push({ guess: num, closeness: closeness });
          gameController.guessCount++;
          if (gameController.guessCount < 3) {
            let percent = floor(closeness * 100);
            gameController.message = "Wrong! Your guess was " + percent + "% close. You have " + (3 - gameController.guessCount) + " try" + ((3 - gameController.guessCount) === 1 ? "" : "ies") + " left.";
          } else {
            // Out of tries.
            gameController.result = "miss";
            gameController.state = STATE_RESULT;
            gameController.message = "Out of guesses! The correct cell was " + gameController.hiddenCell + ".";
            player1.score++;
            // Check win condition.
            if (player1.score >= 5) {
              gameController.state = STATE_WIN;
              gameController.winner = player1;
              gameController.winAnimationProgress = 0;
              gameController.message = "Winner: " + player1.name + " wins! (Press R to reset)";
            }
          }
        }
      }
    }
  }
  else if (gameController.state === STATE_RESULT) {
    // After a round is over, any number key starts the next round.
    nextRound();
  }
  // In STATE_WIN, ignore number keys (wait for reset).
}

function handleMouseClicked() {
  // No mouse control in this game.
}

// Updates game controller variables (e.g., win animation progress).
function updateGameController() {
  if (gameController.state === STATE_WIN) {
    gameController.winAnimationProgress = min(gameController.winAnimationProgress + 0.01, 1);
  }
}
