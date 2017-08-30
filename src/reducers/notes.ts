import { Reducer } from 'redux';

import { CLEARED_NOTES, SAVED_NOTES } from 'flashiro/actions/notes';

export interface INotesState {
  value: string,
}

const initialState: INotesState = {
  value: JSON.parse(localStorage.getItem('notes') || ''),
};

export const notesReducer: Reducer<INotesState> = (state = initialState, action) => {
  let partialState: Partial<INotesState> | undefined;

  switch (action.type) {
    case CLEARED_NOTES:
      partialState = {
        ...state,
        value: '',
      };
      break;
    case SAVED_NOTES:
      partialState = {
        ...state,
        value: action.payload,
      };
      break;
  }

  return partialState !== undefined ? { ...state, ...partialState } : state;
};
