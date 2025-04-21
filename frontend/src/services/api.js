import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
        config.headers.Authorization = `Basic ${credentials}`;
    }
    return config;
});

export default api;