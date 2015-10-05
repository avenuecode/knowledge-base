import React from 'react'

export default class Editor extends React.Component {

	constructor(props) {
		super(props);

		var self = this;

		$(document).on('file.open', function(event, file) {
			var converter = new showdown.Converter();

			self.setState({
				content: converter.makeHtml(self.cleanUp(file.content))
			}, function() {
				$('#mdModal').openModal();
			});
		});

		this.state = {};
	}
	
	cleanUp(data) {
		data = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

		return data;
	}

	render() {
		return (
			<div id="mdModal" className="modal modal-fixed-footer">
	          <div className="modal-content">
	            <div className="content-wrapper" dangerouslySetInnerHTML={{__html: this.state.content}}></div>	            
	          </div>
	          <div className="modal-footer">
	            <a href="#" className="modal-action modal-close waves-effect waves-red btn-flat">Fechar</a>
	          </div>
	        </div>
		);
	}
}