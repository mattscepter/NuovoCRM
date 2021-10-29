const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:600/api',
});

export default axiosInstance;
