import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://newsapi.org/v1',
  timeout: 1000,
  params: {
    apiKey: 'e47b8acde9a7445a9235d1e4822b9e85'
  }
});

class Api {
  static queryCnn() {
    return httpClient.get('/articles', {
      params: {
        sortBy: 'top',
        source: 'cnn'
      }
    });
  }
}

export default Api;
