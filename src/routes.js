import createHistory from 'history/createBrowserHistory';
import React from 'react';
import {Route, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import App from './App';

function routes(store) {
  const history = syncHistoryWithStore(createHistory(), store);

  return(
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
}

export default routes;
