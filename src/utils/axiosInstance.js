const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6000/api',
});

export default axiosInstance;
