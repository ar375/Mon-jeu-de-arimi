const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
  boardState.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-cell-index', index);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
}

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-cell-index');

  if (boardState[cellIndex] !== '' || !gameActive) {
    return;
  }

  cell.textContent = currentPlayer;
  boardState[cellIndex] = currentPlayer;

  checkResult();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
  let roundWon = false;

  winningConditions.forEach(condition => {
    const [a, b, c] = condition;
    if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
      return;
    }
    if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
    }
  });

  if (roundWon) {
    alert(`Le joueur ${currentPlayer} a gagné!`);
    gameActive = false;
    return;
  }

  if (!boardState.includes('')) {
    alert('Match nul!');
    gameActive = false;
  }
}

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
  });
}

resetButton.addEventListener('click', resetGame);
createBoard();