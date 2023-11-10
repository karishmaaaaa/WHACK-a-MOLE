// Selecting DOM elements
var holes = document.querySelectorAll('.hole');
var scoreBoard = document.querySelector('.score');
var moles = document.querySelectorAll('.mole');
var startButton = document.getElementById('startButton');
var lastHole;
var timeUp = false;
var score = 0;
var timeLeft = 20;
var gameRunning = false;
var backgroundMusic = document.getElementById('backgroundMusic'); 
var user_name = document.getElementById('user_name');

// Function to generate random time
function randomTime(min, max) {
   // Calculate random time between min and max
  return Math.round(Math.random() * (max - min) + min);
}

// Function to get a random hole
function randomHole(holes) {
  // Find a random index within the holes array
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  
  // If the same hole is selected, recursively call the function again
  if (hole === lastHole) {
    return randomHole(holes);
  }
  
  lastHole = hole;
  return hole;
}

// Function to display a mole at a random hole for a random time
function poop() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) poop();
  }, time);
}

// Function to update the timer display
function updateTimerDisplay() {
  const timeValue = document.querySelector('.time-value');
  timeValue.textContent = timeLeft;
}

// Function to display the game over modal
function showGameOverModal() {
  const modal = document.getElementById('gameOverModal');
  const finalScoreSpan = document.getElementById('finalScore');
  const playAgainButton = document.getElementById('playAgainButton');
  
  finalScoreSpan.textContent = score;
  modal.style.display = 'block';
  user_name.textContent = localStorage.getItem('name');
  
  playAgainButton.addEventListener('click', () => {
    modal.style.display = 'none';
    timeLeft = 20;
    score = 0;
    updateTimerDisplay();
    scoreBoard.textContent = score;
    startGame();
  });
}

// Function to start the game
function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  timeLeft = 20;
  updateTimerDisplay();
  poop();
  playBackgroundMusic(); 
  
  // Timer interval to update time left
  const timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    // Game over condition
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeUp = true;
      gameRunning = false;
      showGameOverModal();
    }
  }, 1000);
}

// Function to handle clicking on a mole
function bonk(e) {
  if (!e.isTrusted || timeUp) return;
  score++;
  scoreBoard.textContent = score;
  const mole = this.querySelector('.mole');
  mole.classList.add('up');
  setTimeout(() => {
    mole.classList.remove('up');
  }, 500);
}

// Add click event listeners for moles
moles.forEach(mole => mole.addEventListener('click', bonk));

// Add click event listener for the start button
startButton.addEventListener('click', () => {
  if (!gameRunning) {
    startButton.disabled = true;
    startGame();
  }
});


// Function to play the background music
function playBackgroundMusic() {
  backgroundMusic.play();
}

// Call playBackgroundMusic when the page loads
window.onload = playBackgroundMusic;