/** @jsx React.DOM */

var React = require('react');

var Card = module.exports = React.createClass({

	getInitialState: function() {
		var hasPicture;

		hasPicture = this.props.file.owners && this.props.file.owners.length && this.props.file.owners[0].picture &&
			this.props.file.owners[0].picture.url;

		return {
			id: this.props.file.id,
			title: this.props.file.title,
			picture: hasPicture ? this.props.file.owners[0].picture.url : 'img/default-avatar.png'
		};
	},

	openFile: function(event) {
		
	},
	
	render: function() {
		return (
			<div className={this.props.className}>
				<div className='card'>
				    <div className="card-image waves-effect waves-block waves-light">
				      <img className="activator" src={this.state.picture}/>
				    </div>
				    <div className="card-content">
				      <span className="card-title activator grey-text text-darken-4">{this.state.title}<i className="material-icons right">more_vert</i></span>
				      <p><a href="#" onClick={this.openFile}>Abrir Documento</a></p>
				    </div>
				    <div className="card-reveal">
				      <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
				      <p>Here is some more information about this product that is only revealed once clicked on.</p>
				    </div>
				</div>
			</div>
		);
	}
});

