const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://api.nuovoindia.link/api',
});

export default axiosInstance;
