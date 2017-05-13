import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import placeholders from './placeholders';

const rootReducer = combineReducers({
  placeholders,
  routing: routerReducer
});

export default rootReducer;
