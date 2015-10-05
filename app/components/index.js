/** @jsx React.DOM */

var React = require('react');
var Card = require('./card.jsx');
var Editor = require('./editor');

var Index = module.exports = React.createClass({
	storage: null,

	getInitialState: function() {
		var self = this;

		$(document).on('new.docs', function(event) {
			if(self.isMounted) {
				self.setState({
					files: self.storage.get('files')
				});
			}
		});

		$(document).on('filter.docs', function(event, filter) {
			if(self.isMounted) {
				self.setState({
					filter: filter
				});
			}
		});

		// local storage initialization
		this.storage = $.initNamespaceStorage('acnb_').localStorage;

		return {
			files: this.storage.get('files'),
			filter: ''
		};
	},

	componentDidMount: function() {
		var self = this;


	},

	componentDidUpdate: function() {
		
	},

	render: function() {
		return (
			<div>
				<div className="row grid">	      
					{this.state.files && this.state.files.map(function(file) {
						return <Card file={file} className="col s12 m6 l4"/>
					})}			
			    </div>

			   	<Editor/>
			</div>
		);
	}
});

