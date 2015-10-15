import React from 'react'
import Utils from '../utils/utils.jsx'

export default class Editor extends React.Component {

	constructor(props) {
		super(props);

		var self = this;

		this.storage = $.initNamespaceStorage('acnb_').localStorage;

		Utils.listen('file.open', function(event, file) {
			let converter = new showdown.Converter(),
				wrapper = $('.content-wrapper'),
				editButton = $('#editButton'),
				saveButton = $('#saveButton');

			// make sure it would show the right content
			wrapper.show();
			editButton.removeClass('disabled');
			saveButton.addClass('disabled');

			if(self.epic && self.epic.is('loaded')) {
				self.epic.unload();
			}

			self.setState({
				file: file,
				content: converter.makeHtml(self.cleanUp(file.content)),
				editorContent: file.content,
				fileOwner: file.owner
			}, function() {
				$('#mdModal').openModal();
			});
		});

		Utils.listen('file.new', function(event) {
			let converter = new showdown.Converter(),
				wrapper = $('.content-wrapper'),
				editButton = $('#editButton'),
				saveButton = $('#saveButton');

			// make sure it would show the right content
			wrapper.show();
			editButton.addClass('disabled');
			saveButton.addClass('disabled');

			if(self.epic && self.epic.is('loaded')) {
				self.epic.unload();
			}

			self.setState({
				newFile: true,
				editorContent: "<!--\nACKB: 1.0\nCOMMON NAME: <User or Company Name>\nSUBJECT: <About this Doc>\nMOTIVATION: <Why this Doc>\nTAGS: <Space separated Tags>\n-->\n\n<Doc MarkDown Content...>",
				fileOwner: true
			}, function() {
				$('#mdModal').openModal();

				self.showEditor();
			});
		});

		this.state = {};
	}
	
	cleanUp(data) {
		data = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

		return data;
	}

	showEditor(event) {
		let wrapper = $('.content-wrapper'),
			editor = $('#contentToEdit'),
			editButton = event ? $(event.target) : null,
			saveButton = $('#saveButton'),
			modal = $('#mdModal'),
			editorHeight,
			fullScreenClass = 'fullScreenModalClass';

		wrapper.hide();

		editor.val(this.state.editorContent);
		editButton && editButton.addClass('disabled');
		saveButton.removeClass('disabled');

		this.epic = new EpicEditor({
			container: 'contentToEditor',
  			textarea: 'contentToEdit',
  			basePath: '/vendor/EpicEditor/epiceditor',
  			useNativeFullscreen: false,
  			focusOnLoad: true,
  			theme: {
			    base: '/themes/base/epiceditor.css',
			    preview: '/themes/preview/github.css',
			    editor: '/themes/editor/epic-dark.css'
			}
		});

		// editor events
		this.epic.on('load', function() {
			editorHeight = $('#contentToEditor').height();
		});

		this.epic.on('fullscreenenter', function() {
			modal.addClass(fullScreenClass);
		});

		this.epic.on('fullscreenexit', function() {
			modal.removeClass(fullScreenClass);

			// restore height
			$('#contentToEditor, #contentToEditor iframe').height(editorHeight);
		});

		// editor initialization
		this.epic.load();
	}

	saveContent() {
		var editor = $('#contentToEdit'),
			content = this.cleanUp(editor.val()),
			self = this;

		Utils.notify('ajax.active');
		updateFile(this.state.file.id, '', content, function(result) {
			if(result.id) {
				// save content locally
				var files = self.storage.get('files');

				$.each(files, function(index, file) {
					if(file.id === self.state.file.id) {
						file.content = content;

						return false;
					}
				});

				self.storage.set('files', files);

				Utils.notify('file.update');
				Utils.notify('ajax.inactive');

				Utils.toast('Arquivo salvo!');
			} else {
				Utils.toast('ERRO: Não foi possível salvar o arquivo.');
			}
		});
	}

	createContent() {
		var editor = $('#contentToEdit'),
			fileContent = this.cleanUp(editor.val()),
			self = this,
			regex,
			matches,
			content = {},
			tags,
			files,
			fileName;

		regex = /<!--\s(ACKB: 1.0)\sCOMMON NAME:(.*)\sSUBJECT:(.*)\sMOTIVATION:(.*)\sTAGS:(.*)\s-->\s\s/,
        matches = regex.exec(fileContent);

        if(matches) {
			content.commonName = matches[2];
			content.subject = matches[3];
			content.motivation = matches[4];
			content.tags = matches[5].trim().split(/\s/);
			content.content = fileContent.trim();

			fileName = content.subject + '.ackb';

          	Utils.notify('ajax.active');
			insertFile(fileContent, fileName, function(file) {
				if(file.id) {
		            content.id = file.id;
		            content.title = file.title;
		            content.picture = (file.owners && file.owners.length && file.owners[0].picture && file.owners[0].picture.url) ? file.owners[0].picture.url.replace('s64', 's256') : 'img/default-avatar.png';
		            content.downloadUrl = file.downloadUrl;
		            content.shared = false;
		            content.owner = true;
		            content.icon = file.iconLink;
	            	content.alternateLink = file.alternateLink;

					// add tags to the list
					tags = self.storage.get('tags') || [];
					tags = tags.concat(content.tags);

					// normalize and store tag names
					self.storage.set('tags', tags.filter(function(tag, index, array) {
						return array.indexOf(tag) === index;
					}, self).sort());

					files = self.storage.get('files');
					files.push(content);
					self.storage.set('files', files);

					Utils.notify('file.update');

					// change state for edition
					self.setState({
						newFile: false,
						content: fileContent,
						file: content
					});

					Utils.notify('ajax.inactive');

					Utils.toast('Arquivo criado!');
				} else {
					Utils.toast('ERRO: Não foi possível criar o arquivo.');
				}
			});
        } else {
          console.log('File didn\'t match.');

          Utils.toast('ERRO: Cabeçalho de arquivo inválido!');
        }
	}

	render() {
		let contentStyle = {minHeight: '100% !important'},
			editButton = this.state.fileOwner ? <a href="#" id="editButton" onClick={this.showEditor.bind(this)} className="modal-action waves-effect waves-red btn-flat">Editar</a> : '',
			saveButton = this.state.fileOwner ? <a href="#" id="saveButton" onClick={this.state.newFile ? this.createContent.bind(this) : this.saveContent.bind(this)} className="modal-action waves-effect waves-blue btn-flat disabled">Salvar</a> : '';

		return (
			<div id="mdModal" className="modal modal-fixed-footer">
	          <div className="modal-content">
	            <div className="content-wrapper" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
	            <div id="contentToEditor" style={contentStyle}></div>
	            <textarea id="contentToEdit" className="hide"></textarea>
	          </div>
	          <div className="modal-footer">
	            <a href="#" className="modal-action modal-close waves-effect waves-red btn-flat">Fechar</a>
	            {editButton}
	            {saveButton}
	          </div>
	        </div>
		);
	}
}