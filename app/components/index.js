/** @jsx React.DOM */

var React = require('react');
var Card = require('./card');
var Editor = require('./editor')

var Index = module.exports = React.createClass({
	storage: null,

	getInitialState: function() {
		var self = this;

		// listen for document to be added and insert it in the list
		$(document).on('new.doc', function(event, data) {
			self.state.files.push(data);
		});

		$(document).on('new.docs', function(event, data) {
			if(this.isMounted) {
				self.setState({
					files: data
				});
			}
		});

		// local storage initialization
		this.storage = $.initNamespaceStorage('acnb_').localStorage;

		return {
			files: this.storage.get('files')
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

