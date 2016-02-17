'use strict';

var React = require('react');

var TicTacToe = React.createClass({

	render: function(size) {
		this._boardSize = size; // might add dynamic board size later
		this._board = [];
		for (var x = 0; x < size * size; x++) {
			this._board.push(0);
		}
		this._turn = 1; // 1 stands for x and 2 stands for o, x always starts
	},

	restartGame: function() {
		this._board = this._board.map(function(n) {
			return 0;
		});
	},

	makeMove: function(tileNum) {
		this._board[tileNum] = this._turn;
		if (this._turn == 1) {
			this._turn = 2;
		} else {
			this._turn = 1;
		}
	},

	gameOver: function(lastMoved) {

		// check columns
		for (var x = 0; x < this._boardSize; x++) {
			if (this._board[(x * this._boardSize) + (lastMoved % this._boardSize)] 
				!= this._turn) {
				x = this._boardSize; // break the loop
			} else if (x == this._boardSize - 1) {
				return 1; // someone won
			}
		}

		// check rows
		for (var x = 0; x < this._boardSize; x++) {
			if (this._board[(lastMoved / this._boardSize) * boardSize + x]
				!= this._turn) {
				x = this._boardSize; // break the loop
			} else if (x == this._boardSize - 1) {
				return 1; // someone won
			}
		}

		// check if need to check forward diagonal
		if ((lastMoved / this._boardSize) == (lastMoved % this._boardSize)) {
			for (var x = 0; x < this._boardSize; x++) {
				if (this._board[x * this._boardSize + x] != this._turn) {
					x = this._boardSize; // break the loop
				} else if (x == this.boardSize - 1) {
					return 1; // someone won
				}
			}
		}

		// check if need to check backwards diagonal
		if ((this._boardSize - 1 - (lastMoved % this._boardSize)) 
			== (lastMoved / this._boardSize)) {
			for (var x = 0; x < this._boardSize; x++) {
				if (this._board[x * this._boardSize + this.boardSize - x] != this._turn) {
					x = this._boardSize; // break the loop
				} else if (x == this.boardSize - 1) {
					return 1; // someone won
				}
			}
		}

		return 0; // no one has won
	}

})

module.exports.TicTacToe = TicTacToe;