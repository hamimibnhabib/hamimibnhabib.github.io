function initializePuzzleGame() {
    const puzzleContainer = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle');
    
    // Create a 4x4 grid (15 tiles + 1 empty space)
    const tiles = Array.from({ length: 15 }, (_, i) => i + 1);
    tiles.push(null); // The empty tile
    let grid = [...tiles];

    // Shuffle and create grid
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function createTiles() {
        puzzleContainer.innerHTML = ''; // Clear previous tiles
        grid.forEach((tile, i) => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            if (tile === null) {
                tileElement.classList.add('empty');
            } else {
                tileElement.innerText = tile;
                tileElement.addEventListener('click', () => moveTile(i));
            }
            puzzleContainer.appendChild(tileElement);
        });
    }

    // Function to move tile
    function moveTile(index) {
        const emptyIndex = grid.indexOf(null);
        const validMoves = [emptyIndex - 4, emptyIndex + 4, emptyIndex - 1, emptyIndex + 1];
        if (validMoves.includes(index)) {
            [grid[emptyIndex], grid[index]] = [grid[index], grid[emptyIndex]]; // Swap tiles
            createTiles();
        }
    }

    // Shuffle button
    shuffleButton.addEventListener('click', () => {
        grid = shuffle(tiles);
        createTiles();
    });

    createTiles(); // Initialize puzzle
}

document.addEventListener('DOMContentLoaded', () => {
    initializePuzzleGame();
});

const PUZZLE_GAME = 'PUZZLE_GAME';
const TIC_TAC_TOE_GAME = 'TIC_TAC_TOE_GAME';

let gameName = PUZZLE_GAME;

function setPuzzleGame() {
    gameName = PUZZLE_GAME;

    const gameContainer = document.getElementById('game-container');

    gameContainer.innerHTML = `
      <h1> Sliding Puzzle Game</h1>
      <div id="puzzle-container"></div>
      <button id="shuffle">Randomize</button>`

    initializePuzzleGame();
}

function initializeTicTacToeGame() {
    const cells =  document.querySelectorAll('.cell');

    const resetBtn = document.getElementById('reset-btn');

    let currentPlayer = 'X';

    let board = ['', '', '', '', '', '', '', '', ''];

    let gameActive = true;

    const winConditions = [

        [0, 1, 2],

        [3, 4, 5],

        [6, 7, 8],

        [0, 3, 6],

        [1, 4, 7],

        [2, 5, 8],

        [0, 4, 8],

        [2, 4, 6]

    ];

    cells.forEach(cell => {

        cell.addEventListener('click', handleClick);

    });

    function handleClick(event) {

        const cell = event.target;

        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) return;

        board[index] = currentPlayer;

        cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

        cell.innerText = currentPlayer;

        if (checkWin()) {

            displayWinner();

            gameActive = false;

            return;

        }

        if (board.every(cell => cell !== '')) {

            setTimeout(() => alert('It\'s a tie!'), 10);

            gameActive = false;

            return;

        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    }

    function checkWin() {

        return winConditions.some(condition => {

            if (condition.every(index => board[index] === currentPlayer)) {

                highlightWinningCells(condition);

                return true;

            }

            return false;

        });

    }

    function highlightWinningCells(condition) {

        condition.forEach(index => {

            cells[index].classList.add('win');

        });

    }

    function displayWinner() {

        setTimeout(() => {

            document.body.style.backgroundImage = 'radial-gradient(circle, yellow, orange)';

            alert(`${currentPlayer} wins!`);

        }, 10);

    }

    resetBtn.addEventListener('click', resetGame);

    function resetGame() {

        board = ['', '', '', '', '', '', '', '', ''];

        cells.forEach(cell => {

            cell.innerText = '';

            cell.classList.remove('x', 'o', 'win');

        });

        currentPlayer = 'X';

        gameActive = true;

        document.body.style.backgroundImage = ''; // Reset the background

    }

    // Array of colors to choose from

    const colors = ["#000000","#FFD700", "#FF00FF", "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "FF0000", "#FFA500", "#800080", "#FFB533"];

    // Function to change background color

    function changeBackgroundColor() {

        // Pick a random color from the array

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Set the background color of the body

        document.body.style.backgroundColor = randomColor;

    }

    // Add an event listener to the button

    document.getElementById("colorButton").addEventListener("click", changeBackgroundColor);
}

function setTicTacToeGame() {
    gameName = TIC_TAC_TOE_GAME;

    const gameContainer = document.getElementById('game-container');

    gameContainer.innerHTML = `
    <h1>Tic-Tac-Toe</h1>

    <div id="game-board">

        <div class="cell" data-index="0"></div>

        <div class="cell" data-index="1"></div>

        <div class="cell" data-index="2"></div>

        <div class="cell" data-index="3"></div>

        <div class="cell" data-index="4"></div>

        <div class="cell" data-index="5"></div>

        <div class="cell" data-index="6"></div>

        <div class="cell" data-index="7"></div>

        <div class="cell" data-index="8"></div>

    </div>

    <button id="reset-btn">Reset</button>
    
    <button id="colorButton">Change Color</button>`

    initializeTicTacToeGame();
}