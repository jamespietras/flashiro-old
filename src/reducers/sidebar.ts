import { Reducer } from 'redux';

import { TOGGLED_SIDEBAR } from 'flashiro/actions/sidebar';

export interface ISidebarState {
  open: boolean,
}

const initialState: ISidebarState = {
  open: false,
};

export const sidebarReducer: Reducer<ISidebarState> = (state = initialState, action) => {
  let partialState: Partial<ISidebarState> | undefined;

  switch (action.type) {
    case TOGGLED_SIDEBAR:
      partialState = {
        ...state,
        open: !state.open,
      };
      break;
  }

  return partialState !== undefined ? { ...state, ...partialState } : state;
}
