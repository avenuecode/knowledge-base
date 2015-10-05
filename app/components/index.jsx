import React from 'react'
import Card from './card.jsx'
import Editor from './editor.jsx'

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
			if(self.isMounted) {
				self.setState({
					filter: filter
				});
			}
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

	render() {
		return (
			<div>
				<div className="row grid">	      
					{this.state.files && this.state.files.map(function(file) {
						return <Card file={file} className="col s12 m6 l4"/>
					})}			
			    </div>

			   	<Editor/>
			</div>
		);
	}
}