import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import App from 'flashiro/app';
import Dashboard from 'flashiro/dashboard';

function routes(store) {
  const history = syncHistoryWithStore(createHistory(), store);

  return (
    <BrowserRouter history={history}>
      <App>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/test" component={() => <h1 className="text-center">Test route</h1>} />
      </App>
    </BrowserRouter>
  );
}

export default routes;
