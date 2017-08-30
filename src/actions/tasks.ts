import { Action, Dispatch } from 'redux';

export const COMPLETED_TASK = 'tasks:completed';
export const CREATED_TASK = 'tasks:created';
export const TOGGLED_TASK_PRIORITY = 'tasks:toggledPriority';

export function completeTask(taskId: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: COMPLETED_TASK,
      payload: taskId,
    });
  };
}

export function createTask(taskData: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CREATED_TASK,
      payload: taskData,
    });
  };
}

export function toggleTaskPriority(taskId: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: TOGGLED_TASK_PRIORITY,
      payload: taskId,
    });
  };
}
