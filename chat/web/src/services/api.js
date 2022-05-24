import axios from 'axios';

const defaultOptions = {
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
};

let api = axios.create(defaultOptions);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.resolve(error.response);
  },
);

export default api;
