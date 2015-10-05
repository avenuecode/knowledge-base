import React from 'react'
import NavBar from './navbar.jsx'
import Index from './index.jsx'
import {Link} from 'react-router'

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    var self = this;

    this.importClasses = "btn-floating btn-large waves-effect waves-light btn modal-trigger red darken-3";
    this.storage = $.initNamespaceStorage('acnb_').localStorage;

    $(document).on('drive.loading.finish', function() {
      self.setState({
        logged: true
      });

      self.importFiles();
    });

    $(document).on('google.loading.finish', function() {
      self.setState({
        importClasses: self.importClasses
      });
    });

    this.state = {
      bIcon: 'cloud',
      importClasses: this.importClasses + ' disabled'
    };
  }

  checkGoogleLogin() {
    if(! this.state.logged) {
      checkAuth();
    } else {
      this.importFiles();
    }
  }

  importFiles() {
    var self = this,
      request;

    $(document).trigger('ajax.active');

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
            downloadUrl: file.downloadUrl,
            shared: file.shared
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

              $(document).trigger('new.docs');
              $(document).trigger('ajax.inactive');
            }
          });
        });
      } else {
        $(document).trigger('ajax.inactive');
      }
    }, "fullText contains '\"ACKB: 1.0\"'");
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="row">
          <div className="col l12 m12 s12">
            <div className="container">        
              {this.props.children}

              <a onClick={this.checkGoogleLogin.bind(this)} id="importButton" className={this.state.importClasses} href="#"><i className="material-icons">{this.state.bIcon}</i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

