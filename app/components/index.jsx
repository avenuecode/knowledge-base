import React from 'react'
import Card from './card.jsx'
import _ from 'lodash'

export default class Index extends React.Component {

	constructor(props) {
		super(props);

		let self = this;

		$(document).on('new.docs', function(event) {
			self.setState({
				files: self.storage.get('files')
			});
		});

		$(document).on('filter.docs', function(event, filter) {
			self.doFilter(filter.trim());
		});

		// local storage initialization
		this.storage = $.initNamespaceStorage('acnb_').localStorage;

		this.state = {
			files: this.storage.get('files'),
			filter: ''
		};
	}

	componentDidMount() {
		var self = this;

	}

	componentDidUpdate() {
		
	}

	doFilter(filter) {
		var files = this.storage.get('files');

		if(filter) {
			files = files.filter(function(file, index, files) {
				var hasContent = false;

				_.forEach(file.tags, function(tag) {
					if(~tag.indexOf(filter)) {
						hasContent = true;

						return false;
					}
				});

				return hasContent;
			}, this);
		} 
		
		this.setState({
			files: files
		});	
	}

	render() {
		return (
			<div>
				<div className="row grid">	      
					{this.state.files && this.state.files.map(function(file) {
						return <Card file={file} key={file.id} className="col s12 m6 l4"/>
					})}			
			    </div>
			</div>
		);
	}
}