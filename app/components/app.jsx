import React from 'react'
import NavBar from './navbar.jsx'
import Index from './index.jsx'
import Editor from './editor.jsx'
import {Link} from 'react-router'
import Utils from '../utils/utils.jsx'

export default class App extends React.Component {
  
  constructor(props) {
    super();

    var self = this;

    this.storage = $.initNamespaceStorage('acnb_').localStorage;

    Utils.listen('user.logged', function() {
      self.setState({
        logged: true
      });
    });

    Utils.listen('user.ready', function() {
      self.setState({
        online: true
      });
    });

    Utils.listen('file.fetch', function() {
      self.importFiles();
    });

    this.state = {};
  }

  componentDidMount() {
    $('.tooltipped').tooltip({delay: 50});
  }

  checkLoginOrImport() {
    if(! this.state.logged) {
      checkAuth();
    } else {
      this.importFiles();
    }
  }

  addNewDoc() {
    Utils.notify('file.new');
  }

  importFiles() {
    var self = this,
      request;

    Utils.notify('ajax.active');

    retrieveAllFiles(function(files) {
      var results = [],
        tags = self.storage.get('tags') || [],
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
            downloadUrl: file.downloadUrl,
            shared: file.shared,
            owner: file.userPermission.role === "owner",
            icon: file.iconLink,
            alternateLink: file.alternateLink
          };

          // fetch file
          downloadFile(file, function(fileContent) {
            var regex = /<!--\s(ACKB: 1.0)\sCOMMON NAME:(.*)\sSUBJECT:(.*)\sMOTIVATION:(.*)\sTAGS:(.*)\s-->\s\s/,
              matches = regex.exec(fileContent);

            if(matches) {
              content.commonName = matches[2];
              content.subject = matches[3];
              content.motivation = matches[4];
              content.tags = matches[5].trim().split(/\s/);
              content.content = fileContent.trim();

              results.push(content);

              // add tags to the list
              tags = tags.concat(content.tags);
            } else {
              console.log('File ' + file + ' didn\'t match.');
            }

            count--;
            if(count === 0) {
              self.storage.set('files', results);

              // normalize and store tag names
              self.storage.set('tags', tags.filter(function(tag, index, array) {
                return array.indexOf(tag) === index;
              }, self).sort());

              Utils.notify('file.update');
              Utils.notify('ajax.inactive');

              Utils.toast('Arquivos descarregados!');
            }
          });
        });
      } else {
        Utils.notify('ajax.inactive');
      }
    }, "fullText contains 'ACKB:' and not trashed");
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="row">
          <div className="col l12 m12 s12">
            <div className="container">        
              {this.props.children}

              <a href="#" onClick={this.addNewDoc.bind(this)} id="newDocButton" data-position="top" data-tooltip="Adicionar novo documento" className={'tooltipped btn-floating btn-large waves-effect waves-light btn modal-trigger green darken-3' + (this.state.logged ? '' : ' disabled')}><i className="material-icons">add</i></a>
              <a href="#" onClick={this.checkLoginOrImport.bind(this)} id="importButton" data-position="top" data-tooltip={this.state.logged ? 'Sincronizar arquivos remotos' : 'Fazer login no Google Drive'} className={'tooltipped btn-floating btn-large waves-effect waves-light btn modal-trigger darken-3' + (this.state.logged ? ' blue ' : ' red ') + (this.state.online ? '' : ' disabled')}><i className="material-icons">{this.state.logged ? 'cloud_download' : 'account_circle'}</i></a>
            </div>
          </div>
        </div>

        <Editor/>
      </div>
    );
  }
}

