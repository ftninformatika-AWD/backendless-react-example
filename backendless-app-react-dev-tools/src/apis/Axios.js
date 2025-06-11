import axios from 'axios';

var Axios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  /* other custom settings */
});

export default Axios;