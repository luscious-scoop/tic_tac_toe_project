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
			marker: "X",
		},

		{
			name: playerTwoName,
			token: 2,
			marker: "O",
		},
	];

	let activePlayer = players[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

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
		let board = gameBoard.getBoard();

		/** Row check  */

		let currValue = activePlayer.token;
		let row = false;

		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				console.log("Row start ");
				console.log(currValue === board[i][j].getValue());
				console.log(`current value : ${currValue}`);
				console.log(`current board value : ${board[i][j].getValue()}`);
				console.log("Row check end ");

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

		if (row) {
			alert(`${activePlayer.name} Won row  `);
			return;
		}
		/** Row check end  */

		/** Column  check start  */

		let column = false;
		let rowIndex = 0;

		for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
			for (
				rowIndex = 0;
				rowIndex < board[columnIndex].length;
				rowIndex++
			) {
				console.log("Column start ");
				console.log(
					currValue === board[rowIndex][columnIndex].getValue(),
				);
				console.log(`current value : ${currValue}`);
				console.log(
					`current board value : ${board[rowIndex][columnIndex].getValue()}`,
				);
				console.log("Column check end ");
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
			alert(`${activePlayer.name}  column`);
			return;
		}
		/** Column check end  */

		/** diag check start  */
		let diag = false;

		for (let i = 0; i < board.length; i++) {
			console.log("diag  start ");
			console.log(currValue === board[i][i].getValue());
			console.log(`current value : ${currValue} drag `);
			console.log(
				`current board drag  value : ${board[i][i].getValue()}`,
			);
			console.log("diag  check end ");
			if (currValue === board[i][i].getValue()) {
				diag = true;
			} else {
				diag = false;
			}
		}
		console.log(`${diag} diag`);
		if (diag) {
			alert(`${activePlayer.name} Won drag `);
			return;
		}

		/** Diag  check end  */

		/** reverse diag  start */

		let reverseDiag = false;

		let index = board.length - 1;
		for (let i = 0; i < board.length; i++) {
			if (currValue === board[i][index].getValue()) {
				reverseDiag = true;
				index--;
			} else {
				reverseDiag = false;
				break;
			}
		}

		if (reverseDiag) {
			alert(`${activePlayer.name} Won reverse `);
		}

		/** reverse diag end  */
		let tie = false;
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				if (board[i][j].getValue() === 0) {
					tie = true;
				} else {
					tie = false;
					break;
				}
			}
		}
		if (tie) {
			alert("Tie");
		}
	};
	return {
		getActivePlayer,
		resetRound,
		playRound,
		getBoard: gameBoard.getBoard,
	};
}

function ScreenController() {
	let game = GameController();
	const boardDiv = document.querySelector(".board");
	const playerTurnDiv = document.querySelector(".turn");

	const startingScreen = document.querySelector(".starting-screen");
	const playerOneInput = document.querySelector("#player1");
	const playerTwoInput = document.querySelector("#player2");
	const startBtn = document.querySelector("#start-btn");

	const initialScreenHandler = () => {
		let playerOneName =
			playerOneInput.value !== "" ? playerOneInput.value : "PLayerOne";

		let playerTwoName =
			playerTwoInput.value !== "" ? playerTwoInput.value : "PLayerTwo";
		game = GameController(playerOneName, playerTwoName);
		startingScreen.style.display = "none";
		boardDiv.display = "grid";
		updateScreen();

		return game;
	};

	const updateScreen = () => {
		boardDiv.textContent = "";

		const activePlayer = game.getActivePlayer();
		const board = game.getBoard();

		playerTurnDiv.textContent = `${activePlayer.name} turn's `;

		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				const cellButton = document.createElement("button");

				cellButton.dataset.row = i;
				cellButton.dataset.column = j;
				if (board[i][j].getValue() === activePlayer.token) {
					cellButton.textContent = activePlayer.marker;
				}
				boardDiv.appendChild(cellButton);
			}
		}
	};

	const BoardEventHandler = (e) => {
		const selectedRow = e.target.dataset.row;
		const selectedColumn = e.target.dataset.column;

		if (!selectedColumn || !selectedRow) {
			return;
		}

		game.playRound(selectedRow, selectedColumn);
		updateScreen();
	};
	boardDiv.addEventListener("click", BoardEventHandler);

	startBtn.addEventListener("click", () => {
		initialScreenHandler();
	});
}
ScreenController();
