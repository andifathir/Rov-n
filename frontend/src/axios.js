// In your axios.js or similar file
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',  // Using the proxy defined in Vite config
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
