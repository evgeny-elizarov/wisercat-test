import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
});

export default client;