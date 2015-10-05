/** @jsx React.DOM */

var React = require('react');
var AppRouter = require('./config/routes');
var Router = require('react-router').Router;
var App = require('./components/app');

/*Router.run(AppRouter, window.location, Router.HashLocation, function(Root) {
  React.render(<Root/>, document.body);
});*/

//React.render(AppRouter, document.body);

React.render(<App/>, document.body);