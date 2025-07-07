// src/services/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://apibookingsaccomodations-production.up.railway.app',
});

// Interceptor para agregar el token en las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;