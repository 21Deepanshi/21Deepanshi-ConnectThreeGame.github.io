const ROWS = 6;
const COLS = 3;
let currentPlayer = 'X';
let board = [
    ['','',''],
    ['','',''],
    ['','',''],
    ['','',''],
    ['','',''],
    ['','','']
];
let gameOver = false;

const restartButton = document.getElementById('button');

function displayBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            document.getElementById(`cell${i}${j}`).innerText = board[i][j];
        }
    }
}

function checkWinner() {
    // Check rows and columns
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (board[i][j] !== '') {
                // Check horizontal
                if (j <= COLS - 3 && board[i][j] === board[i][j+1] && board[i][j] === board[i][j+2]) {
                    return board[i][j];
                }
                // Check vertical
                if (i <= ROWS - 3 && board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j]) {
                    return board[i][j];
                }
                // Check diagonal (from top-left to bottom-right)
                if (i <= ROWS - 3 && j <= COLS - 3 && board[i][j] === board[i+1][j+1] && board[i][j] === board[i+2][j+2]) {
                    return board[i][j];
                }
                // Check diagonal (from top-right to bottom-left)
                if (i >= 2 && j <= COLS - 3 && board[i][j] === board[i-1][j+1] && board[i][j] === board[i-2][j+2]) {
                    return board[i][j];
                }
            }
        }
    }

    // Check for a tie
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (board[i][j] === '') {
                return null; // Game is not over yet
            }
        }
    }
    return 'tie'; // If no winner and the board is full, it's a tie
}

function dropPiece(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            return row; // Return the row where the piece is dropped
        }
    }
    return -1; // Column is full
}

function cellClicked(row, col) {
    if (!gameOver && board[row][col] === '') {
        row = dropPiece(col); // Adjust row to where the piece falls
        if (row === -1) {
            return; // Don't change player if column is full
        }
        document.getElementById(`cell${row}${col}`).textContent = currentPlayer;
        document.getElementById(`cell${row}${col}`).classList.add('fall');

        // Check for the winner
        const winner = checkWinner();
        if (winner !== null) {
            if (winner === 'tie') {
                alert("It's a tie! No One Win");
            } else {
                alert(`Congratulations! Player ${winner} wins!`);
            }
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            // update turn message 
            document.getElementById('turnMessage').textContent = `Turn of ${currentPlayer}`;
        }
    }
}
function restartGame() {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            board[i][j] = '';
            const cell = document.getElementById(`cell${i}${j}`);
            cell.textContent = '';
            cell.classList.remove('fall'); // Remove 'fall' class from cell
            document.getElementById('turnMessage').textContent = `Turn of X`;
        }
    }
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('message').textContent = '';
}
document.getElementById('button').addEventListener('click', restartGame);
displayBoard();
