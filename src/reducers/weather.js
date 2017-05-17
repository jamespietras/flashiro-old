import _ from 'lodash';
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
  let forecast = _.take(forecastList, 7);

  forecast = _.map(forecast, entry => ({
    description: _.first(entry.weather).description,
    icon: _.first(entry.weather).main.toLowerCase(),
    temperature: Math.round(entry.main.temp - 273.15),
    time: moment(entry.dt_txt),
  }));

  return forecast;
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
