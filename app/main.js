'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var TicTacToe = require('./game');
var components = require('./components');

var game = new TicTacToe(10);
//game.makeMove(1);

var controller = {
	handleClick:function(game, buttonID) {
		if (buttonID == -1) { // restart button
			game.restartGame();
		} else {
			game.makeMove(buttonID);
		}
		this.renderAll(game);
	},

	renderAll:function(game) {
		ReactDOM.render(<components.InfoBox game={game} controller={this}/>, 
			document.getElementById('infoBox'));
		ReactDOM.render(<components.Grid game={game} controller={this}/>, 
			document.getElementById('gameContainer'));
		ReactDOM.render(<components.ScoreBoard game={game}/>, 
			document.getElementById('scoreBoard'));
	}
}

ReactDOM.render(<components.Title />, document.getElementById('content'));
controller.renderAll(game);