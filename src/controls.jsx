var React = require('react'),
		_ = require('lodash');

var Controls = React.createClass({
	render: function() {
// console.log(this.props.data)
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
		var toggleValues = this.state.toggleValues;
		toggleValues = _.mapValues(toggleValues,
											function(value, key) {
												return newState && key == picked;
											});
		this.setState({toggleValues: toggleValues});
	},
	getInitialState: function() {
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
	componentWillReceiveProps: function(nextProps) {
		this.setState({value: nextProps.value});
	},
	render: function() {
		var className = 'btn btn-default';
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