'use strict';

import React from 'react';
import Utils from '../utils/utils.jsx'

export default class Card extends React.Component {

	constructor(props) {
		super(props);

		var self = this;

		Utils.listen('user.logged', function() {
	      self.setState({
	        logged: true
	      });
	    });

		this.state = {};
	}

	render() {
		return (
			<div className={"help-content" + (! this.props.files || ! this.props.files.length ? '' : ' hidden')}>
				<p className="flow-text center">
					O <b>AvenueCode Knowledge Base</b><sup>&reg;</sup> é um aplicativo web destinado a criação e distribuição de documentações e artigos diversos através
					do Google Drive. 
				</p>
				<p className="flow-text center">
					A idéia é, além de permitir uma interação ativa entre os desenvolvedores, criar uma comunicação direta entre os membros da 
					comunidade, visto que o compartilhamento necessita ser realizado manualmente. Isso facilita o procesos de troca de informação e 
					de criação de networking entre todos os membros contribuintes.
				</p>
				<div className="help-row center">
		        	<a href="#" className='btn-floating btn-large waves-effect waves-light btn modal-trigger darken-3 red'><i className="material-icons">account_circle</i></a>
		        	<p className="flow-text">Acesse sua conta do Google Drive para sincronizar, criar ou editar suas documentações.</p>
		        </div>
		        <div className="help-row center">
		        	<a href="#" className='btn-floating btn-large waves-effect waves-light btn modal-trigger darken-3 blue'><i className="material-icons">cloud_download</i></a>
		        	<p className="flow-text">Após logado, use este botão para sincronizar seus arquivos do Google Drive, inclusive os compartilhados com você, com o seu Browser.</p>
		        </div>
		        <div className="help-row center">
		        	<a href="#" className='btn-floating btn-large waves-effect waves-light btn modal-trigger green darken-3'><i className="material-icons">add</i></a>
		        	<p className="flow-text">Inclua novos documetos, já com o cabeçalho padrão disponível.</p>
		        </div>
		    </div>
		)
	}

}