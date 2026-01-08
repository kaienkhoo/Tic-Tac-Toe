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
            return false;
        }

        board[row][column].addMarker(player);
        return true;
    }

    const getBoardState = () => {
        return board.map(row => row.map(cell => cell.getValue()));
    }


    return { getBoard, getBoardState, placeMarker };
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

    const printNewRound = () => {
        console.log(board.getBoardState());
        console.log(`${getActivePlayer().name}'s turn (${getActivePlayer().marker})`);
    };

    const playRound = (row, column) => {
        const validMove = board.placeMarker(row, column, getActivePlayer().marker);

        if (!validMove) {
            return;
        }

        if (checkWinner()) {
            console.log(board.getBoardState());
            console.log(`${getActivePlayer().name} wins!`);
            return
        }

        switchPlayer();
        printNewRound();
    };

    printNewRound()

    return { playRound, getActivePlayer }
}

const game = GameController();

game.playRound(2, 1)
game.playRound(0, 0)
game.playRound(1, 1)
game.playRound(0, 1)
game.playRound(1, 2)
game.playRound(0, 2)




