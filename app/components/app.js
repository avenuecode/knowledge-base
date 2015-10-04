/** @jsx React.DOM */

var React = require('react');
var NavBar = require('./navbar');
var AddNewDoc = require('./add-new-doc');

var App = module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <NavBar/>
        <div className="container">        
          {this.props.activeRouteHandler()}   

          <AddNewDoc/>
        </div>
      </div>
    );
  }

});

