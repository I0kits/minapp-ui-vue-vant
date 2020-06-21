import axios from 'axios';

import conf from '../conf';

const instance = axios.create({
  timeout: 30000,
  baseURL: conf.apiBaseUrl,
});

instance.interceptors.request.use((cfg) => {
  console.log('send Request with:', cfg);
  return cfg;
}, (err) => {
  console.log('send Request error:', err);
  return Promise.reject(err);
});

instance.interceptors.response.use((resp) => {
  console.log('Got Response:', resp);
  return resp;
}, (err) => {
  console.log('Parser Response error:', err);
  return Promise.reject(err);
});

export default instance;
