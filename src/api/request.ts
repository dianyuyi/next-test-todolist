import axios from 'axios';
import { BASE_HOST } from '@/constants/url';

const instance = axios.create({
  baseURL: `https://${BASE_HOST}`,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
