const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://13.234.29.23:6000/api',
});

export default axiosInstance;
