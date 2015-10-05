import React from 'react'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link } from 'react-router'

import App from './components/app.jsx'
import Index from './components/index.jsx'
import Fetch from './components/fetch.jsx'

const history = useBasename(createHistory)({
  basename: '/ackb'
})

React.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="index" component={Index} />
      <Route path="fetch" component={Fetch} />
    </Route>
  </Router>
), document.body)