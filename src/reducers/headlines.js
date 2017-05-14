import {
  LOADED_CNN_HEADLINES,
  LOADING_CNN_HEADLINES
} from '../actions/headlines';

const initialState = {
  cnn: [],
  loadingCnn: false
};

function headlines(state = initialState, action) {
  switch(action.type) {
    case LOADED_CNN_HEADLINES:
      return {
        ...state,
        cnn: action.payload,
        loadingCnn: false
      };
    case LOADING_CNN_HEADLINES:
      return {
        ...state,
        loadingCnn: true
      };
    default:
      return state;
  }
}

export default headlines;
