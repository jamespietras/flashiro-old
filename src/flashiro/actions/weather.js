import _pick from 'lodash/pick';

import Api from 'flashiro/api';

export const ERROR_WEATHER_FORECAST = 'weather:errorWeatherForecast';
export const LOADED_WEATHER_FORECAST = 'weather:loadedWeatherForecast';
export const LOADING_WEATHER_FORECAST = 'weather:loadingWeatherForecast';

export function loadWeatherForecast() {
  return (dispatch) => {
    dispatch({ type: LOADING_WEATHER_FORECAST });

    if (!navigator.geolocation) {
      dispatch({
        type: ERROR_WEATHER_FORECAST,
        payload: 'Geolocation not supported',
      });

      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;

      Api.queryWeather(coords.latitude, coords.longitude).then((response) => {
        dispatch({
          type: LOADED_WEATHER_FORECAST,
          payload: _pick(response.data, ['city', 'list']),
        });
      }).catch((error) => {
        dispatch({
          type: ERROR_WEATHER_FORECAST,
          payload: error.message,
        });
      });
    }, (error) => {
      dispatch({
        type: ERROR_WEATHER_FORECAST,
        payload: error.message,
      });
    });
  };
}
