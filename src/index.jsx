import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import routes from 'flashiro/routes';
import store from 'flashiro/store';

ReactDOM.render(
  <Provider store={store}>
    {routes(store)}
  </Provider>,
  document.getElementById('root'),
);
