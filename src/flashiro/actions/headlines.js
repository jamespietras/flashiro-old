import _take from 'lodash/take';
import Api from 'flashiro/api';

export const LOADED_CNN_HEADLINES = 'headlines:loadedCnnHeadlines';
export const LOADING_CNN_HEADLINES = 'headlines:loadingCnnHeadlines';

export function loadCnnHeadlines() {
  return (dispatch) => {
    dispatch({ type: LOADING_CNN_HEADLINES });

    Api.queryCnn().then((response) => {
      dispatch({
        type: LOADED_CNN_HEADLINES,
        payload: _take(response.data.articles, 3),
      });
    });
  };
}
