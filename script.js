const gameBoard = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

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

// Update game status
const displayStatus = (message) => {
    statusDisplay.textContent = message;
};

// Check if a player has won
const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayStatus(`Player ${currentPlayer} wins!`);
        isGameActive = false;
        return true;
    }

    if (!board.includes('')) {
        displayStatus('It\'s a draw!');
        isGameActive = false;
        return true;
    }

    return false;
};

// Handle player's move
const handleMove = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (!checkWinner()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayStatus(`Player ${currentPlayer}'s turn`);
    }
};

// Reset the game
const resetGame = () => {
    board.fill('');
    currentPlayer = 'X';
    isGameActive = true;
    displayStatus(`Player X's turn`);
    gameBoard.forEach(cell => {
        cell.textContent = '';
    });
};

// Add event listeners to each cell
gameBoard.forEach(cell => {
    cell.addEventListener('click', handleMove);
});

// Add reset button event listener
resetButton.addEventListener('click', resetGame);

// Initial status display
displayStatus(`Player X's turn`);
