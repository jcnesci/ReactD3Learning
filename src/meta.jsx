var React = require('react'),
		d3 = require('d3'),
		_ = require('lodash'),
		States = require('./states.js');

var MetaMixin = {

};

var Title = React.createClass({
	mixins: [MetaMixin],
	render: function () {
		return null;
	}
});

var Description = React.createClass({
	mixins: [MetaMixin],
	render: function () {
		return null;
	}
});

module.exports = {
	Title: Title,
	Description: Description
}