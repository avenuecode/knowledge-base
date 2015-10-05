import React from 'react'
import Router, { Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './components/app.jsx'
import Index from './components/index.jsx'
import Fetch from './components/fetch.jsx'

React.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="index" component={Index} />
      <Route path="fetch" component={Fetch} />
    </Route>
  </Router>
), document.body);