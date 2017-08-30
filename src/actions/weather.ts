import { Action, Dispatch } from 'redux';
import { pick } from 'lodash';

import Api from 'flashiro/api';
import Navigator from 'flashiro/tools/navigator';

export const ERROR_WEATHER_FORECAST = 'weather:errorWeatherForecast';
export const LOADED_WEATHER_FORECAST = 'weather:loadedWeatherForecast';
export const LOADING_WEATHER_FORECAST = 'weather:loadingWeatherForecast';

export function loadWeatherForecast() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: LOADING_WEATHER_FORECAST });

    if (!Navigator.isAvailable()) {
      dispatch({
        type: ERROR_WEATHER_FORECAST,
        payload: 'Geolocation not supported',
      });

      return;
    }

    Navigator.getCurrentPosition().then((position) => {
      const { coords } = position;

      return Api.queryWeather(coords.latitude, coords.longitude);
    }).then(response => (
      dispatch({
        type: LOADED_WEATHER_FORECAST,
        payload: pick(response.data, ['city', 'list']),
      })
    )).catch(error => (
      dispatch({
        type: ERROR_WEATHER_FORECAST,
        payload: error.message,
      })
    ));
  };
}
