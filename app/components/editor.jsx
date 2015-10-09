import React from 'react'

export default class Editor extends React.Component {

	constructor(props) {
		super(props);

		var self = this;

		$(document).on('file.open', function(event, file) {
			let converter = new showdown.Converter(),
				wrapper = $('.content-wrapper'),
				editButton = $('#editButton'),
				saveButton = $('#saveButton');

			// make sure it would show the right content
			wrapper.show();
			editButton.removeClass('disabled');
			saveButton.addClass('disabled');

			if(self.epic) {
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

		this.state = {};
	}
	
	cleanUp(data) {
		data = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

		return data;
	}

	showEditor(event) {
		let wrapper = $('.content-wrapper'),
			editor = $('#contentToEdit'),
			editButton = $(event.target),
			saveButton = $('#saveButton'),
			modal = $('#mdModal'),
			editorHeight,
			fullScreenClass = 'fullScreenModalClass';

		wrapper.hide();

		editor.val(this.state.editorContent);
		editButton.addClass('disabled');
		saveButton.removeClass('disabled');

		this.epic = new EpicEditor({
			container: 'contentToEditor',
  			textarea: 'contentToEdit',
  			basePath: '/vendor/EpicEditor/epiceditor',
  			useNativeFullscreen: false,
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
			content = this.cleanUp(editor.val());

		updateFile(this.state.file.id, '', content, function(result) {
			// save content locally

			
		});
	}

	render() {
		let contentStyle = {minHeight: '100% !important'},
			editButton = this.state.fileOwner ? <a href="#" id="editButton" onClick={this.showEditor.bind(this)} className="modal-action waves-effect waves-red btn-flat">Editar</a> : '',
			saveButton = this.state.fileOwner ? <a href="#" id="saveButton" onClick={this.saveContent.bind(this)} className="modal-action waves-effect waves-blue btn-flat disabled">Salvar</a> : '';

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