import { Reducer } from 'redux';

import { LOADED_CNN_HEADLINES, LOADING_CNN_HEADLINES } from 'flashiro/actions/headlines';

export interface ICnnHeadline {
  author?: string,
  description: string,
  publishedAt?: string,
  title: string,
  url: string,
  urlToImage: string,
}

export interface IHeadlinesState {
  cnn: ICnnHeadline[],
  loadingCnn: boolean,
}

const initialState: IHeadlinesState = {
  cnn: [],
  loadingCnn: false,
};

export const headlinesReducer: Reducer<IHeadlinesState> = (state = initialState, action) => {
  let partialState: Partial<IHeadlinesState> | undefined;

  switch (action.type) {
    case LOADED_CNN_HEADLINES:
      partialState = {
        ...state,
        cnn: action.payload,
        loadingCnn: false,
      };
      break;
    case LOADING_CNN_HEADLINES:
      partialState = {
        ...state,
        loadingCnn: true,
      };
      break;
  }

  return partialState !== undefined ? { ...state, ...partialState } : state;
};
