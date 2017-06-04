export const CLEARED_NOTES = 'notes:cleared';
export const SAVED_NOTES = 'notes:saved';

export function clearNotes() {
  return (dispatch) => {
    dispatch({
      type: CLEARED_NOTES,
    });
  };
}

export function saveNotes(newValue) {
  return (dispatch) => {
    dispatch({
      type: SAVED_NOTES,
      payload: newValue,
    });
  };
}
