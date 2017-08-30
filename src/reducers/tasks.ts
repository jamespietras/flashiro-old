import { Reducer } from 'redux';

import { extend } from 'lodash';
import { v4 } from 'uuid';

import { arrayWithout, arrayUpdate } from 'flashiro/tools/helpers';
import { COMPLETED_TASK, CREATED_TASK, TOGGLED_TASK_PRIORITY } from 'flashiro/actions/tasks';

export interface ITask {
  id: string,
  title: string,
  priority: boolean,
}

export interface ITasksState {
  list: ITask[],
}

const initialState: ITasksState = {
  list: JSON.parse(localStorage.getItem('tasks') || '"[]"') || [],
};

export const tasksReducer: Reducer<ITasksState> = (state = initialState, action) => {
  let partialState: Partial<ITasksState> | undefined;

  switch (action.type) {
    case COMPLETED_TASK:
      partialState = {
        ...state,
        list: arrayWithout(state.list, { id: action.payload }),
      };
      break;
    case CREATED_TASK:
      partialState = {
        ...state,
        list: [
          ...state.list,
          { id: v4(), title: action.payload, priority: false },
        ],
      };
      break;
    case TOGGLED_TASK_PRIORITY:
      partialState = {
        ...state,
        list: arrayUpdate(
          state.list,
          { id: action.payload },
          (item: ITask) => extend(item, { priority: !item.priority }),
        ),
      };
      break;
  }

  return partialState !== undefined ? { ...state, ...partialState } : state;
};
