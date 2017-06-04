import {
  CLEARED_NOTES,
  EDITED_NOTES,
} from 'flashiro/actions/notes';

const initialState = {
  value: JSON.parse(localStorage.getItem('notes')) || '',
};

function tasks(state = initialState, action) {
  switch (action.type) {
    case CLEARED_NOTES:
      return {
        ...state,
        value: '',
      };
    case EDITED_NOTES:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
}

export default tasks;
