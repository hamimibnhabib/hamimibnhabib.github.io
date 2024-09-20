document.addEventListener('DOMContentLoaded', () => {
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
});
