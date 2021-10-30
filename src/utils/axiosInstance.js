const { default: axios } = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://ec2-13-234-29-23.ap-south-1.compute.amazonaws.com/api',
});

export default axiosInstance;
