import { Action, Dispatch } from 'redux';

export const CLEARED_NOTES = 'notes:cleared';
export const SAVED_NOTES = 'notes:saved';

export function clearNotes() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CLEARED_NOTES,
    });
  };
}

export function saveNotes(newValue: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: SAVED_NOTES,
      payload: newValue,
    });
  };
}
