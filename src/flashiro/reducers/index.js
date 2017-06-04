import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import headlines from './headlines';
import notes from './notes';
import tasks from './tasks';
import weather from './weather';

const rootReducer = combineReducers({
  headlines,
  notes,
  routing: routerReducer,
  tasks,
  weather,
});

export default rootReducer;
