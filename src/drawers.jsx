var React = require('react'),
		d3 = require('d3');

var Histogram = React.createClass({
	componentWillMount: function () {
	  this.histogram = d3.layout.histogram();
	  this.widthScale = d3.scale.linear();
	  this.yScale = d3.scale.linear();
	  this.update_d3(this.props);
	},
	componentWillReceiveProps: function (nextProps) {
	  this.update_d3(nextProps);
	},
	update_d3: function (props) {

	},
	render: function () {
		var translate = 'translate(0, '+ this.props.topMargin +')';
		return (
			<g className='histogram' transform={translate}></g>
		);
	}
});

module.exports = {
	Histogram: Histogram
};