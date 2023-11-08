var holes = document.querySelectorAll('.hole');
  var scoreBoard = document.querySelector('.score');
  var moles = document.querySelectorAll('.mole');
  var startButton = document.getElementById('startButton');
  var lastHole;
  var timeUp = false;
  var score = 0;
  var timeLeft = 10; // Initial time limit
  var gameRunning = false; // Flag to track if the game is already running

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      console.log('Ah nah, that\'s the same one, bud');
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function updateTimerDisplay() {
    const timeValue = document.querySelector('.time-value');
    timeValue.textContent = timeLeft;
  }

  function showGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    const finalScoreSpan = document.getElementById('finalScore');
    const playAgainButton = document.getElementById('playAgainButton');

    finalScoreSpan.textContent = score;
    modal.style.display = 'block';

    playAgainButton.addEventListener('click', () => {
      modal.style.display = 'none';

      // Reset time and score
      timeLeft = 10;
      score = 0;

      // Update displays
      updateTimerDisplay();
      scoreBoard.textContent = score;

      // Start the game again
      startGame();
    });
  }

  function startGame() {
    if (gameRunning) return; // Check if the game is already running
    gameRunning = true; // Set the flag to indicate the game is running

    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    timeLeft = 10;
    updateTimerDisplay(); // Initial update
    peep();
    const timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay(); // Update the time display
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeUp = true;
        gameRunning = false; // Reset the flag when the game is over
        showGameOverModal();
      }
    }, 1000);
  }

  function bonk(e) {
    if (!e.isTrusted || timeUp) return; // Cheater or game over!

    // Increment the score and update the display
    score++;
    scoreBoard.textContent = score;

    // Select the mole from the clicked hole and add the 'up' class
    const mole = this.querySelector('.mole');
    mole.classList.add('up');

    // Hide the mole after a short delay
    setTimeout(() => {
      mole.classList.remove('up');
    }, 500); // Adjust the time as needed
  }

  moles.forEach(mole => mole.addEventListener('click', bonk));

  startButton.addEventListener('click', () => {
    if (!gameRunning) {
      startButton.disabled = true; // Disable the start button to prevent multiple starts
      startGame();
    }
  });