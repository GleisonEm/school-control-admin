import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://api.modelojuaprofessor.com.br/',
    baseURL: 'http://localhost:3022/',
    headers: {
        'Content-Type': 'application/json',
        'authorization': '123456'
    }
});

export default instance;