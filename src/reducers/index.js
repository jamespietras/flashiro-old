import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import headlines from './headlines';
import weather from './weather';

const rootReducer = combineReducers({
  headlines,
  routing: routerReducer,
  weather
});

export default rootReducer;
