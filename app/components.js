'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

/**
 * The title of the game... probably did not need a react class
 */
var Title = React.createClass({

	render: function() {
		return <h1>Size N Tic-Tac-Toe</h1>;
	}
});

/**
 * The gameplay information, e.g. whose turn it is or who won
 */
var InfoBox = React.createClass({

	// call the controller click handler with the restart button id
	handleClick: function() {
		this.props.controller.handleClick(this.props.game, -1);
	},

	render: function() {
		if (this.props.game) {
			if (this.props.game.winner) { // in case of win
				if (this.props.game.winner == 1) { // X won
					var winner = "X";
				} else { // O won
					var winner = "O";
				}
				return (
					<div>
						<h2><b>{winner} wins!</b></h2>
						<button onClick={this.handleClick}>
						Play Again?</button>
					</div>
				);
			} else if (this.props.game.turn) { // in case of turn
				if (this.props.game.turn == 1) { // X's turn
					return (
						<h2><b>Your turn, X!</b></h2>
					);
				} else { // O's turn
					return (
						<h2><b>Your turn, O!</b></h2>
					);
				}
			} else { // in case of tie
				return (
					<div>
						<h2><b>TIEEEE!!!!!</b></h2>
						<button onClick={this.handleClick}>
						Play Again?</button>
					</div>
				);
			}
		} else {
			return (
				<h2><b>Click anywhere to play</b></h2>
			);
		}
	}

});

/**
 * The grid of buttons to play the game of tic-tac-toe
 */
var Grid = React.createClass({

	// get the controller to handle the click with the corresponding button
	handleClick: function(buttonID) {
		this.props.controller.handleClick(this.props.game, buttonID);
	},

	render: function() {
		var buttons = [];
		for (var x = 0; x < this.props.game.boardSize*this.props.game.boardSize; x++) {
			var tempKey = "box"+x;
			var marked = this.props.game.board[x];
			if (marked == 1) { // button has been marked by player X
				buttons.push(<button id={x} key={tempKey} className="btn">X</button>);
			} else if (marked == 2) { // button has been marked by player O
				buttons.push(<button id={x} key={tempKey} className="btn">O</button>);
			} else { // button unmarked
				buttons.push(<button id={x} key={tempKey} 
					onClick={this.handleClick.bind(this, x)}></button>);
			}
		}
		var style = { // change the width of the div to accomodate the board size
			margin: "0 auto",
			width: (this.props.game.boardSize*80)+"px"
		};
		return <div style={style}>{buttons}</div>;
	}
});

/**
 * The scoreboard, keeping track of player wins and ties
 */
var ScoreBoard = React.createClass({

	render: function() {
		return (<h3><b>Score:</b> X:{this.props.game.wins[1]}, 
			O:{this.props.game.wins[2]}, Ties:{this.props.game.wins[0]}</h3>);
	}
});

module.exports.Title = Title;
module.exports.InfoBox = InfoBox;
module.exports.Grid = Grid;
module.exports.ScoreBoard = ScoreBoard;