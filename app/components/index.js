/** @jsx React.DOM */

var React = require('react');
var Card = require('./card');

var Index = module.exports = React.createClass({
	getInitialState: function() {
		var self = this;

		// listen for document to be added and insert it in the list
		$(document).on('new.doc', function(event, data) {
			self.state.files.push(data);
		});

		return {
			files: []
		};
	},

	componentDidMount: function() {
		var self = this,
			request;

		$(document).on('loading.finish', function() {			
			retrieveAllFiles(function(files) {
				console.log(files);

				if (files && files.length > 0) {
			        self.setState({
			        	files: files
			        });
				} else {
				  alert('not found');
				}
			}, "fullText contains 'ACKB:1.0'");
		});
	},

	componentDidUpdate: function() {
		
	},

	render: function() {
		return (
			<div className="row grid">	      
				{this.state.files.map(function(file) {
					return <Card file={file} className="col s12 m4 l3"/>
				})}			
		    </div>
		);
	}
});

