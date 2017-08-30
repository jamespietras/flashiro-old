import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';

import { IHeadlinesState, headlinesReducer } from './headlines';
import { INotesState, notesReducer } from './notes';
import { ISidebarState, sidebarReducer } from './sidebar';
import { ITasksState, tasksReducer } from './tasks';
import { IWeatherState, weatherReducer } from './weather';

export interface IRootState {
  headlines: IHeadlinesState,
  notes: INotesState,
  sidebar: ISidebarState,
  tasks: ITasksState,
  weather: IWeatherState,
}

export const rootReducer: Reducer<IRootState> = combineReducers({
  headlines: headlinesReducer,
  notes: notesReducer,
  routing: routerReducer,
  sidebar: sidebarReducer,
  tasks: tasksReducer,
  weather: weatherReducer,
});
