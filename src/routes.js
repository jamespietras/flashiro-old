import createHistory from 'history/createBrowserHistory';
import React from 'react';
import {Route, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import App from './App';
import Dashboard from './components/dashboard/Dashboard';

function routes(store) {
  const history = syncHistoryWithStore(createHistory(), store);

  return(
    <Router history={history}>
      <App>
        <Route exact path="/" component={Dashboard} />
      </App>
    </Router>
  );
}

export default routes;
