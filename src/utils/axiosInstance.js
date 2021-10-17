const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://furniture-crm-backend.herokuapp.com/api',
});

export default axiosInstance;
