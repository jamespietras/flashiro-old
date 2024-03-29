import axios from 'axios';

const newsapi = axios.create({
  baseURL: 'https://newsapi.org/v1',
  timeout: 5000,
  params: {
    apiKey: 'e47b8acde9a7445a9235d1e4822b9e85',
  },
});

const openweathermap = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5',
  timeout: 5000,
  params: {
    appid: '2bb1f33fae9a0b079aa08055ec6675bd',
  },
});

class Api {
  static queryCnn() {
    return newsapi.get('/articles', {
      params: {
        sortBy: 'top',
        source: 'cnn',
      },
    });
  }

  static queryWeather(latitude, longitude) {
    return openweathermap.get('/forecast', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
  }
}

export default Api;
