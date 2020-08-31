import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:3808/api',
});

export default Api;