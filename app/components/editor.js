/** @jsx React.DOM */

var React = require('react');

var Editor = module.exports = React.createClass({

	getInitialState: function() {
		var self = this;

		$(document).on('file.open', function(event, file) {
			var converter = new showdown.Converter();

			self.setState({
				content: converter.makeHtml(file.content)
			}, function() {
				$('#mdModal').openModal();
			});
		});
		
		return {};
	},

	openFile: function(file) {
		
	},
	
	render: function() {
		return (
			<div id="mdModal" className="modal modal-fixed-footer">
	          <div className="modal-content">
	            <div className="content-wrapper" dangerouslySetInnerHTML={{__html: this.state.content}}></div>	            
	          </div>
	          <div className="modal-footer">
	            <a href="#!" className="modal-action modal-close waves-effect waves-red btn-flat">Fechar</a>
	          </div>
	        </div>
		);
	}
});