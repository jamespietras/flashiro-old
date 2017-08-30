import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { ReduxLoggerOptions } from 'redux-logger';

import { IRootState, rootReducer } from 'flashiro/reducers';

const middleware: Middleware[] = [
  thunkMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  const createLogger: (options?: ReduxLoggerOptions) => Middleware = require('redux-logger').createLogger;

  const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true,
    duration: true,
  });

  middleware.push(loggerMiddleware);
}

const store: Store<IRootState> = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);

store.subscribe(() => {
  localStorage.setItem('notes', JSON.stringify(store.getState().notes.value));
  localStorage.setItem('tasks', JSON.stringify(store.getState().tasks.list));
});

export default store;
