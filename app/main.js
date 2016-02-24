'use strict';

// load in the modules
var React = require('react');
var ReactDOM = require('react-dom');
var TicTacToe = require('./game');
var components = require('./components');

/** The game size can be changed by changing the parameter here **/
var game = new TicTacToe(4);

// the controller acts as the intermediary between the view and the game model
var controller = {
	// modify the game model accordingly depending on the button clicked
	handleClick:function(game, buttonID) {
		if (buttonID == -1) { // id for restart button
			game.restartGame();
		} else {
			game.makeMove(buttonID);
		}
		this.renderAll(game);
	},

	// update the view
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