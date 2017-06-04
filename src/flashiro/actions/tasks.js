export const COMPLETED_TASK = 'tasks:completed';
export const CREATED_TASK = 'tasks:created';
export const TOGGLED_TASK_PRIORITY = 'tasks:toggledPriority';

export function completeTask(taskId) {
  return (dispatch) => {
    dispatch({
      type: COMPLETED_TASK,
      payload: taskId,
    });
  };
}

export function createTask(taskData) {
  return (dispatch) => {
    dispatch({
      type: CREATED_TASK,
      payload: taskData,
    });
  };
}

export function toggleTaskPriority(taskId) {
  return (dispatch) => {
    dispatch({
      type: TOGGLED_TASK_PRIORITY,
      payload: taskId,
    });
  };
}
