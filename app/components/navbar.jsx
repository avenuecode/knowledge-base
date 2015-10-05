import React from 'react'
import {Link} from 'react-router'

export default class NavBar extends React.Component {

  componentDidMount() {
    $(".button-collapse").sideNav({
      closeOnClick: true
    });

    $(document).on('ajax.active', function() {
      $('#progressBar').show();
    });

    $(document).on('ajax.inactive', function() {
      $('#progressBar').hide();
    });
  }

  filterChanged(event) {
    var filter = event.target.value;

    $(document).trigger('filter.docs', {filter: filter});
  }

  clearFilter() {
    $(document).trigger('filter.docs', {filter: ''});
  }

  render() {
    return (
      <div className="pgNav">
        <nav>
          <div className="nav-wrapper teal darken-1">
            <span className="brand-logo">AC Knowledge Base</span>
            <a href="#" data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>

            <ul className="right hide-on-med-and-down">
              <div className="input-field">
                <input onChange={this.filterChanged.bind(this)} id="search" type="search" required/>
                <label for="search"><i className="material-icons">search</i></label>
                <i onClick={this.clearFilter.bind(this)} className="material-icons">close</i>
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
