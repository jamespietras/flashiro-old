import _ from 'lodash';
import moment from 'moment';

import {
  LOADED_WEATHER_FORECAST,
  LOADING_WEATHER_FORECAST
} from '../actions/weather';

const initialState = {
  city: null,
  forecast: [],
  loadingForecast: false
};

function headlines(state = initialState, action) {
  switch(action.type) {
    case LOADED_WEATHER_FORECAST:
      let todayForecast = _.filter(action.payload.list, (entry) => {
        return moment().isSame(moment(entry.dt_txt), 'day');
      });

      todayForecast = _.map(todayForecast, (entry) => {
        return {
          description: _.first(entry.weather).main,
          temp: entry.main.temp
        };
      });

      return {
        ...state,
        city: action.payload.city.name,
        forecast: todayForecast,
        loadingForecast: false
      };
    case LOADING_WEATHER_FORECAST:
      return {
        ...state,
        loadingForecast: true
      };
    default:
      return state;
  }
}

export default headlines;
