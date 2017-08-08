import _first from 'lodash/first';
import _map from 'lodash/map';
import _take from 'lodash/take';
import moment from 'moment';

import {
  ERROR_WEATHER_FORECAST,
  LOADED_WEATHER_FORECAST,
  LOADING_WEATHER_FORECAST,
} from '../actions/weather';

const initialState = {
  city: null,
  forecast: [],
  forecastError: null,
  loadingForecast: false,
};

function parseForecast(forecastList) {
  const forecast = _take(forecastList, 7);

  return _map(forecast, entry => ({
    description: _first(entry.weather).description,
    icon: _first(entry.weather).main.toLowerCase(),
    temperature: Math.round(entry.main.temp - 273.15),
    time: moment(entry.dt_txt),
  }));
}

function headlines(state = initialState, action) {
  switch (action.type) {
    case ERROR_WEATHER_FORECAST:
      return {
        ...state,
        forecastError: action.payload,
      };
    case LOADED_WEATHER_FORECAST:
      return {
        ...state,
        city: action.payload.city.name,
        forecast: parseForecast(action.payload.list),
        loadingForecast: false,
      };
    case LOADING_WEATHER_FORECAST:
      return {
        ...state,
        loadingForecast: true,
      };
    default:
      return state;
  }
}

export default headlines;
