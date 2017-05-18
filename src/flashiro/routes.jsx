import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { Route, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from 'flashiro/app';
import Dashboard from 'flashiro/dashboard';

function routes(store) {
  const history = syncHistoryWithStore(createHistory(), store);

  return (
    <Router history={history}>
      <App>
        <Route exact path="/" component={Dashboard} />
      </App>
    </Router>
  );
}

export default routes;
