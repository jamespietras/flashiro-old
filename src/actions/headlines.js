import Api from './_api';

export const LOAD_CNN_HEADLINES = 'headlines:loadCnnHeadlines';
export const LOADING_CNN_HEADLINES = 'headlines:loadingCnnHeadlines';

export function loadCnnHeadlines() {
  return (dispatch) => {
    dispatch({ type: LOADING_CNN_HEADLINES });

    Api.queryCnn().then((response) => {
      dispatch({
        type: LOAD_CNN_HEADLINES,
        payload: response.data.articles
      });
    });
  };
}
