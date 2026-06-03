function GameBoard() {
	let board = [];
	let rows = 3;
	let columns = 3;

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push(Cell());
		}
	}

	const getBoard = () => board;

	const printBoard = () => {
		const boardValues = board.map((row) =>
			row.map((cell) => cell.getValue()),
		);
		return boardValues;
	};

	const placeValues = (row, column, player) => {
		board[row][column].addValue(player);
	};

	const resetBoard = () => {
		board.forEach((row) => row.forEach((cell) => cell.resetValue()));
	};
	return {
		placeValues,
		getBoard,
		printBoard,
		resetBoard,
	};
}

function Cell() {
	let value = 0;
	const addValue = (player) => {
		value = player;
	};

	const getValue = () => value;
	const resetValue = () => {
		value = 0;
	};

	return {
		addValue,
		getValue,
		resetValue,
	};
}

function GameController(
	playerOneName = "PlayerOne",
	playerTwoName = "PlayerTwo",
) {
	let gameBoard = GameBoard();
	let board = gameBoard.getBoard();
	let players = [
		{
			name: playerOneName,
			token: 1,
		},

		{
			name: playerTwoName,
			token: 2,
		},
	];

	let activePlayer = players[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const playRound = (row, column) => {
		if (board[row][column].getValue() === 0) {
			console.log(
				`Placing ${activePlayer.name} token into row:${row} and column:${column}`,
			);

			gameBoard.placeValues(row, column, activePlayer.token);
			switchPlayerTurn();
			printRound();
		} else {
			alert("Spot Already taken");
		}
	};
	const printRound = () => {
		console.log(`${activePlayer.name} turn's `);
		console.log(gameBoard.printBoard());
	};

	return {
		playRound,
	};
}

let game = GameController();
game.playRound(0, 0); // player 1
game.playRound(1, 0); // player 2
game.playRound(0, 1); // player 1
game.playRound(2, 0); // player 2
game.playRound(0, 2); // player 1
