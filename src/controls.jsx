var React = require('react'),
		_ = require('lodash');

var Controls = React.createClass({
	render: function() {
		var getYears = function(data) {
			return _.keys(_.groupBy(data,
															function (d) {
																return d.submit_date.getFullYear()
															}))
							.map(Number);
		};
		return (
			<div>
				<ControlRow data = {this.props.data}
										getToggleNames = {getYears}
										updateDataFilter = {this.updateYearFilter} />
			</div>
		);
	}
});

var ControlRow = React.createClass({
	makePick: function(picked, newState) {
		// Goes through the toggleValues dictionary and sets them to false if they aren’t the one the user clicked on.
		var toggleValues = this.state.toggleValues;
		toggleValues = _.mapValues(toggleValues,
											function(value, key) {
												return newState && key == picked;
											});
		// If newState is false, we want to reset.
		this.props.updateDataFilter(picked, !newState);
		// setState updates ControlRow and triggers a re-render of all the buttons.
		this.setState({toggleValues: toggleValues});
	},
	getInitialState: function() {
    // Initially create the toggleValues dictionary with everything set to false.
    var toggles = this.props.getToggleNames(this.props.data),
    		toggleValues = _.zipObject(toggles,
    																toggles.map(function() { return false; }));
    return {toggleValues: toggleValues};
	},
	render: function() {
		return (
			<div className = 'row'>
				<div className = 'col-md-12'>
					{this.props.getToggleNames(this.props.data).map(function (name) {
						var key = 'toggle-' + name,
								label = name;
						return (
							<Toggle label = {label}
											name = {name}
											key = {key}
											value = {this.state.toggleValues[name]}
											onClick = {this.makePick} />
						);
					}.bind(this))}
				</div>
			</div>
		);
	}
});

var Toggle = React.createClass({
	getInitialState: function() {
    return {value: false};
	},
	handleClick: function() {
		var newState = !this.state.value;
		// Update the button's visual state now (just so it updates faster) even though we'll be updating it in ControlRow's render with onClick below.
		this.setState({value: newState});
		this.props.onClick(this.props.name, newState);
	},
	componentWillReceiveProps: function(nextProps) {
		// When Toggle gets re-rendered in ControlRow, setState and re-render Toggle.
		this.setState({value: nextProps.value});
	},
	render: function() {
		var className = 'btn btn-default';
		// If this.state.value is true, the button is highlighted.
		if (this.state.value) {
			className += ' btn-primary';
		}
		return (
			<button className = {className} onClick = {this.handleClick}>
				{this.props.label}
			</button>
		);
	}
});

module.exports = Controls;