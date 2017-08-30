import { first, map, take } from 'lodash';
import { Reducer } from 'redux';
import * as moment from 'moment';

import { ERROR_WEATHER_FORECAST, LOADED_WEATHER_FORECAST, LOADING_WEATHER_FORECAST } from '../actions/weather';

export interface IForecast {
  description: string,
  icon: string,
  temperature: number,
  time: moment.Moment,
}

export interface IWeatherEntry {
  description: string,
  main: string,
}

export interface IForecastResponse {
  dt_txt: string,
  main: {
    temp: number,
  },
  weather: IWeatherEntry[],
}

export interface IWeatherState {
  city: string | null,
  forecast: IForecast[],
  forecastError: object | null,
  loadingForecast: boolean,
}

const initialState: IWeatherState = {
  city: null,
  forecast: [],
  forecastError: null,
  loadingForecast: false,
};

function extractWeather(entry: IForecastResponse): IWeatherEntry {
  const weather = first(entry.weather);
  return weather ? weather : { description: '', main: '' };
}

function parseForecast(forecastList: IForecastResponse[]): IForecast[] {
  const forecast: IForecastResponse[] = take(forecastList, 7);

  return map(forecast, (entry: IForecastResponse) => ({
    description: extractWeather(entry).description,
    icon: extractWeather(entry).main.toLowerCase(),
    temperature: Math.round(entry.main.temp - 273.15),
    time: moment(entry.dt_txt),
  }));
}

export const weatherReducer: Reducer<IWeatherState> = (state = initialState, action) => {
  let partialState: Partial<IWeatherState> | undefined;

  switch (action.type) {
    case ERROR_WEATHER_FORECAST:
      partialState = {
        ...state,
        forecastError: action.payload,
      };
      break;
    case LOADED_WEATHER_FORECAST:
      partialState = {
        ...state,
        city: action.payload.city.name,
        forecast: parseForecast(action.payload.list),
        loadingForecast: false,
      };
      break;
    case LOADING_WEATHER_FORECAST:
      partialState = {
        ...state,
        loadingForecast: true,
      };
  }

  return partialState !== undefined ? { ...state, ...partialState } : state;
};
