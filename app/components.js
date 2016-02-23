'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Title = React.createClass({

	render: function() {
		return <h1>Size N Tic-Tac-Toe</h1>;
	}
});

var InfoBox = React.createClass({

	handleClick: function() {
		this.props.controller.handleClick(this.props.game, -1);
	},

	render: function() {
		if (this.props.game) {
			if (this.props.game.winner) { // in case of win
				if (this.props.game.winner == 1) {
					var winner = "X";
				} else {
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
				if (this.props.game.turn == 1) {
					return (
						<h2><b>Your turn, X!</b></h2>
					);
				} else {
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

var Grid = React.createClass({

	handleClick: function(buttonID) {
		this.props.controller.handleClick(this.props.game, buttonID);
	},

	render: function() {
		var buttons = [];
		for (var x = 0; x < this.props.game.boardSize*this.props.game.boardSize; x++) {
			var tempKey = "box"+x;
			var marked = this.props.game.board[x];
			if (marked == 1) {
				buttons.push(<button id={x} key={tempKey} className="btn">X</button>);
			} else if (marked == 2) {
				buttons.push(<button id={x} key={tempKey} className="btn">O</button>);
			} else {
				buttons.push(<button id={x} key={tempKey} onClick={this.handleClick.bind(this, x)}></button>);
			}
		}
		var style = {
			margin: "0 auto",
			width: (this.props.game.boardSize*80)+"px"
		};
		return <div style={style}>{buttons}</div>;
	}
});

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