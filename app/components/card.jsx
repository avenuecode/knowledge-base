'use strict';

import React from 'react';
import Utils from '../utils/utils.jsx'

export default class Card extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		$('.tooltipped').tooltip({delay: 50});
	}

	openFile(event) {
		var file = this.props.file;

		Utils.notify('file.open', file);
	}
	
	render() {
		let file = this.props.file;

		return (
			<div className={this.props.className}>
				<div className='card pgCard'>
				    <div className="card-image waves-effect waves-block waves-light">
				      <img className="activator" src={file.picture}/>
				    </div>
				    <div className="card-content">
				      <img src={file.icon}/>
				      <span className="card-title activator grey-text text-darken-4">				      	
				      	<a data-position="left" data-tooltip="Outros Dados" className="tooltipped right" href="#!"><i className="material-icons">more_vert</i></a>
				      	{file.subject}
				      </span>
				      <div className="card-buttons">
				      	<a data-position="top" data-tooltip="Ver Documento" className="tooltipped btn-floating btn-medium waves-effect waves-light blue" href="#!" onClick={this.openFile.bind(this)}><i className="material-icons">visibility</i></a>
				      	<a data-position="top" data-tooltip="Ver Online/Compartilhar" className="tooltipped btn-floating btn-medium waves-effect waves-light red" href={file.alternateLink} target="_blank"><i className="material-icons">library_books</i></a>
				      </div>
				    </div>
				    <div className="card-reveal">
				      <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i></span>
				      <div className="chip">
					    <img src={file.picture} alt="Contact Person"/>
				    	{file.commonName}
					  </div>					  
				      <h5>{file.subject}</h5>
				      <h6>Motivado por: {file.motivation}</h6>
				      {file.tags.map(function(tag, index) {
				      	return <div key={index} className="chip">{tag}</div>
				      })}
				      <div className="chip">{file.title}</div>
				      <div className={file.shared ? 'chip green' : 'chip blue white-text darken-4'}>
				      	{file.shared ? 'Compartilhado' : 'Não Compartilhado'}
				      </div>
				    </div>
				</div>
			</div>
		);
	}
};