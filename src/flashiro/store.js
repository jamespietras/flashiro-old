import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import rootReducer from 'flashiro/reducers';

const middleware = [
  thunkMiddleware,
];

// logger must always be the last middleware
if (process.env.NODE_ENV === 'development') {
  /* eslint-disable global-require */
  const { createLogger } = require('redux-logger');
  /* eslint-enable global-require */

  const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true,
    duration: true,
  });

  middleware.push(loggerMiddleware);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);

export default store;
