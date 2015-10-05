/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router').Router;
var Routes = Router.Routes;
var Route = require('react-router').Route;

var AppRouter = module.exports = (
	<Router>
		<Route path="/" component={require('../components/app')}>
			<Route path="index" component={require('../components/index')} />
			<Route path="fetch" component={require('../components/fetch')} />      
		</Route>
	</Router>
);