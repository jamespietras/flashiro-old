import _extend from 'lodash/extend';
import uuidV4 from 'uuid/v4';

import { arrayWithout, arrayUpdate } from 'flashiro/tools/helpers';
import {
  COMPLETED_TASK,
  CREATED_TASK,
  TOGGLED_TASK_PRIORITY,
} from 'flashiro/actions/tasks';

const initialState = {
  list: JSON.parse(localStorage.getItem('tasks')) || [],
};

function tasks(state = initialState, action) {
  switch (action.type) {
    case COMPLETED_TASK:
      return {
        ...state,
        list: arrayWithout(state.list, { id: action.payload }),
      };
    case CREATED_TASK:
      return {
        ...state,
        list: [
          ...state.list,
          { id: uuidV4(), title: action.payload, priority: false },
        ],
      };
    case TOGGLED_TASK_PRIORITY:
      return {
        ...state,
        list: arrayUpdate(
          state.list,
          { id: action.payload },
          item => _extend(item, { priority: !item.priority }),
        ),
      };
    default:
      return state;
  }
}

export default tasks;
