/** @jsx React.DOM */

var React = require('react');

var Card = module.exports = React.createClass({

	getInitialState: function() {
		return {};
	},

	openFile: function() {
		$(document).trigger('file.open', this.props.file);
	},
	
	render: function() {
		return (
			<div className={this.props.className}>
				<div className='card pgCard'>
				    <div className="card-image waves-effect waves-block waves-light">
				      <img className="activator" src={this.props.file.picture}/>
				    </div>
				    <div className="card-content">
				      <span className="card-title activator grey-text text-darken-4">{this.props.file.subject}<i className="material-icons right">more_vert</i></span>
				      <p><a href="#" onClick={this.openFile}>Abrir Documento</a></p>
				    </div>
				    <div className="card-reveal">
				      <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i></span>
				      <div className="chip">
					    <img src={this.props.file.picture} alt="Contact Person"/>
				    	{this.props.file.commonName}
					  </div>
				      <h5>{this.props.file.subject}</h5>
				      <h6>Motivado por: {this.props.file.motivation}</h6>
				      {this.props.file.tags.map(function(tag) {
				      	return <div className="chip">{tag}</div>
				      })}
				    </div>
				</div>
			</div>
		);
	}
});

