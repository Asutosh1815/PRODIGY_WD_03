const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const winnerMessage = document.querySelector('.winner-message');
const winnerText = document.querySelector('.winner');
const restartButton = document.getElementById('restart');

let isCircleTurn = false;
let boardState = Array(9).fill(null); // Tracks the board state

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  isCircleTurn = false;
  boardState.fill(null);
  cells.forEach(cell => {
    cell.classList.remove('taken');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  winnerMessage.classList.add('hidden');
  restartButton.classList.add('hidden');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'O' : 'X';

  // Place marker
  cell.textContent = currentClass;
  cell.classList.add('taken');
  const cellIndex = Array.from(cells).indexOf(cell);
  boardState[cellIndex] = currentClass;

  // Check for win or draw
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (boardState.every(cell => cell !== null)) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function checkWin(currentClass) {
  return winningCombinations.some(combination =>
    combination.every(index => boardState[index] === currentClass)
  );
}

function endGame(draw) {
  if (draw) {
    winnerText.textContent = "It's a Draw!";
  } else {
    winnerText.textContent = `${isCircleTurn ? 'O' : 'X'} Wins!`;
  }
  winnerMessage.classList.remove('hidden');
  restartButton.classList.remove('hidden');
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;
}

restartButton.addEventListener('click', startGame);

startGame();
