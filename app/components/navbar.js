/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;

var NavBar = module.exports = React.createClass({

  componentDidMount: function() {
    $(".button-collapse").sideNav();
    $(".modal-trigger").leanModal();
  },

  render: function() {
    return (
      <div className="pgNav">
        <nav>
          <div className="nav-wrapper">
            <span className="brand-logo">AC Knowledge Base</span>
            <a href="#" data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>

            <ul className="right hide-on-med-and-down">
              <li><Link to="index">Index</Link></li>
            </ul>

            <ul id="mobile-nav" className="side-nav">
              <li><Link to="index">Index</Link></li>
              <li><Link to="foo">Components</Link></li>
              <li><Link to="bar">JavaScript</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }

});

