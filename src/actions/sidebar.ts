import { Action, Dispatch } from 'redux';

export const TOGGLED_SIDEBAR = 'sidebar:toggled';

export function toggleSidebar() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: TOGGLED_SIDEBAR,
    });
  };
}
