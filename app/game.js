'use strict';

var React = require('react');

/**
 * The game model of my tic-tac-toe game.
 */
class TicTacToe {
	constructor(size) {
		this._boardSize = size; // might add dynamic board size later
		this._board = [];
		this._winner = undefined;
		this._wins = [];
		// fill the board with 0's to represent empty spaces
		for (var x = 0; x < this._boardSize * this._boardSize; x++) {
			this._board.push(0);
		}

		// there are no wins or ties yet
		for (var y = 0; y < 3; y++) {
			this._wins.push(0);
		}
		this._turn = 1; // 1 stands for x and 2 stands for o, x always starts
	}

	// functions to read private variables (no write access allowed)

	get board() {
		return this._board;
	}

	get boardSize() {
		return this._boardSize;
	}

	get turn() {
		return this._turn;
	}

	get winner() {
		return this._winner;
	}

	get wins() {
		return this._wins;
	}

	// gameplay functions

	// resets the board, X player's turn
	restartGame() {
		this._board = this._board.map(function(n) {
			return 0;
		});
		this._winner = undefined;
		this._turn = 1;
	}

	// make a TicTacToe move if it is someone's turn
	makeMove(tileNum) {
		if (this._turn) {
			this._board[tileNum] = this._turn;
		} else {
			return false;
		}

		if (this.gameOver(tileNum)) {
			if (this._winner) {
				// winner
				this._wins[this._winner]++;
			} else {
				// tie
				this._wins[0]++;
			}
			this._turn = undefined;
		}

		if (this._turn == 1) {
			this._turn = 2;
		} else if (this._turn == 2) {
			this._turn = 1;
		}
		return true;
	}

	// check if the game has ended
	gameOver(lastMoved) {
		// check columns
		for (var x = 0; x < this._boardSize; x++) {
			if (this._board[(x * this._boardSize) + (lastMoved % this._boardSize)] 
				!= this._turn) {
				x = this._boardSize; // break the loop
			} else if (x == this._boardSize - 1) {
				this._winner = this._turn;
				return true; // someone won on a column
			}
		}

		// check rows
		for (var x = 0; x < this._boardSize; x++) {
			if (this._board[Math.floor(lastMoved / this._boardSize) * this._boardSize + x]
				!= this._turn) {
				x = this._boardSize; // break the loop
			} else if (x == this._boardSize - 1) {
				this._winner = this._turn;
				return true; // someone won on a row
			}
		}

		// check if need to check forward diagonal
		if (Math.floor(lastMoved / this._boardSize) == (lastMoved % this._boardSize)) {
			for (var x = 0; x < this._boardSize; x++) {
				if (this._board[x * this._boardSize + x] != this._turn) {
					x = this._boardSize; // break the loop
				} else if (x == this.boardSize - 1) {
					this._winner = this._turn;
					return true; // someone won on a diagonal
				}
			}
		}

		// check if need to check backwards diagonal
		if ((this._boardSize - 1 - (lastMoved % this._boardSize)) 
			== Math.floor(lastMoved / this._boardSize)) {
			for (var x = 0; x < this._boardSize; x++) {
				if (this._board[x * this._boardSize + this.boardSize - x - 1] != this._turn) {
					x = this._boardSize; // break the loop
				} else if (x == this.boardSize - 1) {
					this._winner = this._turn;
					return true; // someone won on a backwards diagonal
				}
			}
		}

		var boardFilled = true;

		// check if the board has been filled
		for (var x = 0; x < this._board.length; x++) {
			if (this._board[x] == 0) {
				boardFilled = false;
			}
		}

		return boardFilled; // no one has won
	}
}

module.exports = TicTacToe;