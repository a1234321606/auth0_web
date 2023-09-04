import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

interface IData {
  [key: string]: any
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 120000,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { indices: false }),
  },
});

api.interceptors.request.use((config) => {
  // Add timezone to header
  const tz = new Date().getTimezoneOffset() / -60;
  config.headers['X-TimeZone'] = `UTC${tz > 0 ? `+${tz}` : tz}`;

  return config;
});

api.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    let isAuthorized = true;
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
        case 412:
          isAuthorized = false;
          break;
        default:
          break;
      }
    }
    if (!isAuthorized) {
      window.location.href = '/';
    }
    return Promise.reject(error.response || error);
  },
);

export default {
  instance: api,
  get: async (url: string, params?: IData, config?: AxiosRequestConfig) => api.get(url, { ...config, params }),
  post: async (url: string, data?: IData, config?: AxiosRequestConfig) => api.post(url, data, config),
  put: async (url: string, data?: IData, config?: AxiosRequestConfig) => api.put(url, data, config),
  delete: async (url: string, config?: AxiosRequestConfig) => api.delete(url, config),
};
