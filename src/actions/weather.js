import _ from 'lodash';

import Api from './_api';

export const LOADED_WEATHER_FORECAST = 'weather:loadedWeatherForecast';
export const LOADING_WEATHER_FORECAST = 'weather:loadingWeatherForecast';

export function loadWeatherForecast() {
  return (dispatch) => {
    dispatch({ type: LOADING_WEATHER_FORECAST });

    Api.queryWeather().then((response) => {
      dispatch({
        type: LOADED_WEATHER_FORECAST,
        payload: _.pick(response.data, ['city', 'list'])
      });
    });
  };
}
