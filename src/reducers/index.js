import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import headlines from './headlines';

const rootReducer = combineReducers({
  headlines,
  routing: routerReducer
});

export default rootReducer;
