import {
  TOGGLED_SIDEBAR,
} from 'flashiro/actions/sidebar';

const initialState = {
  open: false,
};

function sidebar(state = initialState, action) {
  switch (action.type) {
    case TOGGLED_SIDEBAR:
      return {
        ...state,
        open: !state.open,
      };
    default:
      return state;
  }
}

export default sidebar;
