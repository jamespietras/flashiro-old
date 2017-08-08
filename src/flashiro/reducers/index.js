import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import headlines from './headlines';
import notes from './notes';
import sidebar from './sidebar';
import tasks from './tasks';
import weather from './weather';

const rootReducer = combineReducers({
  headlines,
  notes,
  routing: routerReducer,
  sidebar,
  tasks,
  weather,
});

export default rootReducer;
