const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://furniture-crm-backend.herokuapp.com/api',
});

export default axiosInstance;
