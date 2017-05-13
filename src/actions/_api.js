import axios from 'axios';

const newsapi = axios.create({
  baseURL: 'https://newsapi.org/v1',
  timeout: 1000,
  params: {
    apiKey: 'e47b8acde9a7445a9235d1e4822b9e85'
  }
});

const openweathermap = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5',
  timeout: 1000,
  params: {
    appid: '2bb1f33fae9a0b079aa08055ec6675bd'
  }
});

class Api {
  static queryCnn() {
    return newsapi.get('/articles', {
      params: {
        sortBy: 'top',
        source: 'cnn'
      }
    });
  }

  static queryWeather() {
    return openweathermap.get('/forecast', {
      params: {
        lat: '50.06465009999999',
        lon: '19.94497990000002'
      }
    });
  }
}

export default Api;
