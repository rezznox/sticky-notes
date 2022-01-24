import { create } from 'apisauce';

const api = create({
  baseURL: process.env.API_URL || 'http://localhost:8080/api',
  timeout: 3000
});

export const axios = api.axiosInstance;

export default api
