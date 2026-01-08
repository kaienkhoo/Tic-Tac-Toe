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
            console.log('Cell already occupied');
            return;
        }

        board[row][column].addMarker(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCellValues);
    }


    return { getBoard, printBoard, placeMarker };
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

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn (${getActivePlayer().marker})`);
    };

    const playRound = (row, column) => {
        board.placeMarker(row, column, getActivePlayer().marker);

        switchPlayer();
        printNewRound();
    };

    printNewRound()

    return { playRound, getActivePlayer }
}

const game = GameController();

game.playRound(2, 1)




