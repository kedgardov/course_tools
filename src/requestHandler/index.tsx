import axios from 'axios';

const requestHandler = axios.create({
    //baseURL: 'http://localhost/api/',
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 4000,
    withCredentials: true,
});

export default requestHandler;
