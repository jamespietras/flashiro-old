import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import headlines from './headlines';
import tasks from './tasks';
import weather from './weather';

const rootReducer = combineReducers({
  headlines,
  routing: routerReducer,
  tasks,
  weather,
});

export default rootReducer;
