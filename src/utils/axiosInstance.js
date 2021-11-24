const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.nuovoindia.link/api',
  // baseURL: 'https://furniture-crm-backend.herokuapp.com/api',
});

export default axiosInstance;
