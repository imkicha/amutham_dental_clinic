import axios from 'axios';
import { API_BASE } from './clinic';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adc_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401 && location.pathname.startsWith('/admin')) {
      localStorage.removeItem('adc_admin_token');
      if (location.pathname !== '/admin/login') location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);
