function Cell() {
    let value = ' ';

    const addMarker = (playerMarker) => {
        value = playerMarker;
    }

    const getValue = () => value;

    return { addMarker, getValue };
}

function Gameboard() {
    const columns = 3;
    const rows = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        if (board[row][column].getValue() !== ' ') {
            return false;
        }

        board[row][column].addMarker(player);
        return true;
    }

    const getBoardState = () => {
        return board.map(row => row.map(cell => cell.getValue()));
    }

    const resetBoard = () => {
        board.forEach(row => row.forEach(cell => cell.addMarker(' ')));
    }

    return { getBoard, getBoardState, placeMarker, resetBoard };
}


function GameController() {
    const board = Gameboard();

    const players = [
        {
            name: 'Player 1',
            marker: 'X'
        },
        {
            name: 'Player 2',
            marker: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const checkWinner = () => {
        const b = board.getBoardState();

        for (let i = 0; i < 3; i++) {
            if (b[i][0] === activePlayer.marker && b[i][1] === activePlayer.marker && b[i][2] === activePlayer.marker) {
                return true;
            }

            if (b[0][i] === activePlayer.marker && b[1][i] === activePlayer.marker && b[2][i] === activePlayer.marker) {
                return true;
            }
        }

        if (b[0][0] === activePlayer.marker && b[1][1] === activePlayer.marker && b[2][2] === activePlayer.marker) {
            return true;
        }
        if (b[0][2] === activePlayer.marker && b[1][1] === activePlayer.marker && b[2][0] === activePlayer.marker) {
            return true;
        }

        return false;
    }

    const playRound = (row, column) => {
        const validMove = board.placeMarker(row, column, getActivePlayer().marker);

        if (!validMove) {
            return;
        }

        if (checkWinner()) {
            return;
        }

        switchPlayer();
    };

    const resetGame = () => {
        board.resetBoard();
        activePlayer = players[0];
    }

    return { playRound, getActivePlayer, getBoard: board.getBoard, checkWinner, resetGame };
}


function displayController() {
    const game = GameController();
    const boardElement = document.querySelector('.board');
    const turnElement = document.querySelector('.turn');
    const resetElement = document.querySelector('.reset');

    const updateDisplay = () => {

        boardElement.innerHTML = '';
        resetElement.innerHTML = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        turnElement.textContent = `${activePlayer.name}'s turn (${activePlayer.marker})`;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell')

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = cell.getValue();
                boardElement.append(cellButton);
            })
        });

        if (game.checkWinner()) {
            turnElement.textContent = `${activePlayer.name} wins!`;
            boardElement.querySelectorAll('button').forEach(button => button.disabled = true);

            const resetButton = document.createElement('button');
            resetButton.textContent = 'Reset Game';
            resetButton.classList.add('reset-button');
            resetElement.appendChild(resetButton);

            resetButton.addEventListener('click', () => {
                game.resetGame();
                updateDisplay();
            });
        }
    };

    const handleClick = (e) => {
        if (!e.target.classList.contains('cell')) return;

        if (game.checkWinner()) return;

        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        game.playRound(selectedRow, selectedColumn);
        updateDisplay();

    };


    boardElement.addEventListener('click', handleClick);



    updateDisplay();

}

displayController()
