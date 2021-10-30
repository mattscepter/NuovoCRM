const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://172.31.11.10:6000/api',
});

export default axiosInstance;
