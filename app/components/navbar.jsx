import React from 'react'
import {Link} from 'react-router'
import Utils from '../utils/utils.jsx'

export default class NavBar extends React.Component {

  constructor() {
    super();

    this.storage = $.initNamespaceStorage('acnb_').localStorage;
    this.tags = this.storage.get('tags') || [];
  }

  componentDidMount() {
    $(".button-collapse").sideNav({
      closeOnClick: true
    });

    Utils.listen('ajax.active', function() {
      $('#progressBar').show();
    });

    Utils.listen('ajax.inactive', function() {
      $('#progressBar').hide();
    });
  }

  filterChanged(event) {
    var filter = event.target.value;

    Utils.notify('file.filter', filter);
  }

  clearFilter() {
    Utils.notify('file.filter', '')
    
    $(document).find('input#search').val('');
  }

  render() {
    return (
      <div className="pgNav">
        <nav>
          <div className="nav-wrapper teal darken-1">
            <span className="brand-logo">AC Knowledge Base</span>
            <a href="#" data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>

            <ul className="right hide-on-small-and-down">
              <div className="input-field">
                <input onChange={this.filterChanged.bind(this)} className="selectize" id="search" type="search" required/>
                <label><i className="material-icons">search</i></label>
                <i onClick={this.clearFilter.bind(this)} className="material-icons clear-search">close</i>
              </div>
            </ul>

            <ul id="mobile-nav" className="side-nav">
              <li><Link to="/index">Index</Link></li>
              <li><Link to="/fetch">Sincronizar</Link></li>
            </ul>
          </div>
        </nav>

        <div id="progressBar" className="progress hidden">
          <div className="indeterminate"></div>
        </div>
      </div>
    );
  }

}

