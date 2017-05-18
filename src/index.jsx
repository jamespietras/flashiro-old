import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';

import rootReducer from 'flashiro/reducers';
import routes from 'flashiro/routes';

const loggerMiddleware = createLogger({
  collapsed: true,
  diff: true,
  duration: true,
});

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    {routes(store)}
  </Provider>,
  document.getElementById('root'),
);
