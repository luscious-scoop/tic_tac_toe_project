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
		getBoard,
		printBoard,
		resetBoard,
	};
}

game = GameBoard();
console.log(game.printBoard());

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
