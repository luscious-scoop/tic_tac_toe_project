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
		let board = gameBoard.getBoard();

		if (board[row][column].getValue() !== 0) {
			alert("Spot Already taken");
		} else {
			console.log(
				`Placing ${activePlayer.name} token into row:${row} and column:${column}`,
			);

			gameBoard.placeValues(row, column, activePlayer.token);
			winnerHandler();

			switchPlayerTurn();
			printRound();
		}
	};

	const printRound = () => {
		console.log(`${activePlayer.name} turn's `);
		console.log(gameBoard.printBoard());
	};

	const resetRound = () => {
		gameBoard.resetBoard();
		console.log(gameBoard.printBoard());
		activePlayer = players[0];
	};
	const winnerHandler = () => {
		/** Row check  */
		let board = gameBoard.getBoard();
		let currValue = activePlayer.token;
		let row = false;

		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				/* console.log(currValue === board[i][j].getValue());
				console.log(`current value : ${currValue}`);
				console.log(`current board value : ${board[i][j].getValue()}`); */

				if (currValue === board[i][j].getValue()) {
					row = true;
				} else {
					row = false;
					break;
				}
			}
			if (row) {
				break;
			}
		}
		/** Row check end  */

		if (row) {
			alert(`${activePlayer.name} Won `);
			return;
		}

		let column = false;
		let rowIndex = 0;

		for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
			for (
				rowIndex = 0;
				rowIndex < board[columnIndex].length;
				rowIndex++
			) {
				if (currValue === board[rowIndex][columnIndex].getValue()) {
					column = true;
				} else {
					column = false;
					break;
				}
			}
			if (column) {
				break;
			}
		}
		if (column) {
			alert(`${activePlayer.name} Won`);
			return;
		}
	};
	return {
		resetRound,
		playRound,
	};
}

let game = GameController();
game.playRound(0, 0); // player 1
game.playRound(1, 1); // player 2
game.playRound(1, 0); // player 1
game.playRound(2, 1); // player 2
game.playRound(2, 0); // player 1
