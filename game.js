const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const pixelSize = 20; // Size of each pixel in the grid
const gridWidth = canvas.width / pixelSize;
const gridHeight = canvas.height / pixelSize;
let currentColor = "#000000"; // Default color
let history = [];
let currentState = null;
let currentLevel = 0;
let timer;

const levelImages = [
  "images/level1.png", // Add paths to target images
  "images/level2.png",
  "images/level3.png"
];

// Draw the grid
function drawGrid() {
  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      ctx.strokeStyle = '#ccc'; // Light grid lines
      ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}

// Handle drawing on the canvas
canvas.addEventListener('click', (e) => {
  const x = Math.floor(e.offsetX / pixelSize);
  const y = Math.floor(e.offsetY / pixelSize);
  ctx.fillStyle = currentColor;
  ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  saveState();
});

// Handle color picker changes
document.getElementById('colorPicker').addEventListener('input', (e) => {
  currentColor = e.target.value;
});

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  saveState();
}

// Undo functionality (you could store the canvas states in an array to undo)
function saveState() {
  currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
  history.push(currentState);
}

function undo() {
  if (history.length > 0) {
    const lastState = history.pop();
    ctx.putImageData(lastState, 0, 0);
  }
}

// Start Freeplay Mode
function startFreeplay() {
  document.getElementById('gameModeSelection').style.display = 'none';
  document.getElementById('toolbar').style.display = 'block';
  document.getElementById('levelInstructions').style.display = 'none';
  clearCanvas();
  drawGrid();
}

// Start Levels Mode
function startLevels() {
  document.getElementById('gameModeSelection').style.display = 'none';
  document.getElementById('toolbar').style.display = 'block';
  document.getElementById('levelInstructions').style.display = 'block';
  currentLevel = 0;
  loadLevel(currentLevel);
}

// Load a new level
function loadLevel(levelNumber) {
  if (levelNumber < levelImages.length) {
    const targetImage = levelImages[levelNumber];

    document.getElementById('levelTitle').innerHTML = `Level ${levelNumber + 1}: Replicate this image!`;
    document.getElementById('targetImage').src = targetImage;

    startTimer();
  } else {
    alert("You've completed all the levels!");
  }
}

// Timer functionality (for Levels Mode)
function startTimer() {
  let timeLeft = 120; // Time limit for each level (in seconds)
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up!");
      // You can also check if the user completed the drawing correctly here
    } else {
      console.log(timeLeft);
      timeLeft--;
    }
  }, 1000);
}

// Next Level (call this when user completes the current level)
function nextLevel() {
  currentLevel++;
  loadLevel(currentLevel);
}

