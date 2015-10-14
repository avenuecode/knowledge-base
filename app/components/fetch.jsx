import React from 'react'
import _ from 'lodash'
import Utils from '../utils/utils.jsx'

export default class Fetch extends React.Component {
	constructor(props) {
		super(props);

		// class variables declarations
		this.storage = $.initNamespaceStorage('acnb_').localStorage;
	}

	fetchDocs() {
		var self = this,
			request;

		Utils.notify('ajax.active');

		retrieveAllFiles(function(files) {
			var results = [],
				count;

			console.log(files);

			if (files && files.length > 0) {
				count = files.length;

		        // save files
		        _.forEach(files, function(file, index) {
		        	var content,
		        		hasPicture;

		        	hasPicture = file.owners && file.owners.length && file.owners[0].picture && file.owners[0].picture.url;

					content = {
						id: file.id,
						title: file.title,
						picture: hasPicture ? file.owners[0].picture.url.replace('s64', 's256') : 'img/default-avatar.png',
						downloadUrl: file.downloadUrl
					};

					// fetch file
					downloadFile(file, function(fileContent) {
						var regex = /(ACKB: 1.0)\sCOMMON NAME:(.*)\sSUBJECT:(.*)\sMOTIVATION:(.*)\sTAGS:(.*)/,
							matches = regex.exec(fileContent);

						if(matches) {
							content.commonName = matches[2];
							content.subject = matches[3];
							content.motivation = matches[4];
							content.tags = matches[5].trim().split(/\s/);
							content.content = fileContent.replace(regex, '').trim();

							results.push(content);
						}

						count--;
						if(count === 0) {
							self.storage.set('files', results);

					        Utils.notify('file.update');
					        Utils.notify('ajax.inactive');

					        self.transitionTo('index');
						}
					});
		        });
			} else {
			  Utils.notify('ajax.inactive');
			}
		}, "fullText contains '\"ACKB: 1.0\"'");
	}

	componentDidUpdate() {
		
	}

	render() {
		return (
			<div>			
				<a href="#" onClick={this.fetchDocs} className="waves-effect waves-light btn-large"><i className="material-icons left">cloud</i>Sincronizar Arquivos</a>
		    </div>
		);
	}
}

