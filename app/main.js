'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var game = require('./game');

var test = "This is Working"
var HelloMessage = React.createClass({
  render: function() {
    return <h1>{test}</h1>;
  }
});

ReactDOM.render(<HelloMessage />, document.getElementById('content'));