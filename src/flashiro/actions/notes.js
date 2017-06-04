export const CLEARED_NOTES = 'notes:cleared';
export const EDITED_NOTES = 'notes:edited';

export function clearNotes() {
  return (dispatch) => {
    dispatch({
      type: CLEARED_NOTES,
    });
  };
}

export function editNotes(newValue) {
  return (dispatch) => {
    dispatch({
      type: EDITED_NOTES,
      payload: newValue,
    });
  };
}
