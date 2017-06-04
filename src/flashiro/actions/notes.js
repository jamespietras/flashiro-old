export const EDITED_NOTES = 'notes:edited';

export function editNotes(newValue) {
  return (dispatch) => {
    dispatch({
      type: EDITED_NOTES,
      payload: newValue,
    });
  };
}
