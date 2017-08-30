import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Store } from 'redux';

import App from '@flashiro/app';
import Dashboard from 'flashiro/dashboard';
import { IRootState } from '@flashiro/reducers';

function routes(store: Store<IRootState>) {
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
