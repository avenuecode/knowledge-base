/** @jsx React.DOM */

var React = require('react');

var AddNewDoc = module.exports = React.createClass({

	getInitialState: function() {
		return {
			fileUrl: ''
		};
	},

	componentDidMount: function() {
	    $(".modal-trigger").leanModal();
	},
	
	addDoc: function() {
		var doc;

		if(this.state.fileUrl.trim()) {
			$.get(this.state.fileUrl).done(function(file) {
				console.log(file);
			}).fail(function(error) {
				console.log(error);
			});
		}
	},

	fileUrlChanged: function(event) {
		this.state.fileUrl = event.target.value;

		console.log(this.state);
	},

	render: function() {
		return (
			<div>
				<a id="addNewDocBtn" className="btn-floating btn-large waves-effect waves-light btn modal-trigger" href="#addNewDoc"><i className="material-icons">add</i></a>

		        <div id="addNewDoc" className="modal">
		          <div className="modal-content">
		            <h4>Adicionar Documento</h4>
		            <p>Informe o link publico do documento no campo abaixo:</p>
		            <div className="row">
				        <div className="input-field col s12">
				          <i className="material-icons prefix">attachment</i>
				          <input id="fileUrl" type="text" className="validate" onChange={this.fileUrlChanged}/>
				          <label>URL do Arquivo</label>
				        </div>
				    </div>
		          </div>
		          <div className="modal-footer">
		            <a href="#!" className="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>
		            <a href="#" onClick={this.addDoc} className="modal-action waves-effect waves-green btn-flat">Importar</a>
		          </div>
		        </div>
		    </div>
		);
	}
});