import axios from 'axios';
import { API_URL } from '@/Config';

const axiosExtended = axios.create({
  baseURL: API_URL,
  headers: {}
});

axiosExtended.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosExtended;
