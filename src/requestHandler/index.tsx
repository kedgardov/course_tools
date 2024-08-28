import axios from 'axios';

const requestHandler = axios.create({
    baseURL: 'http://localhost/api/',
    timeout: 4000,
    withCredentials: true,
});

export default requestHandler;
