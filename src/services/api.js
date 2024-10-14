import axios from 'axios';

const api = axios.create({
  baseURL: 'https://carauction20241014.loca.lt', // Your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add the JWT token to every request
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
