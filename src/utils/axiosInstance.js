const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default axiosInstance;
