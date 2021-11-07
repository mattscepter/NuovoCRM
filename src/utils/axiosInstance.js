const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://3.109.153.114/api',
});

export default axiosInstance;
