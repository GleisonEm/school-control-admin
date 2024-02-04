import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3022/', // Substitua pela URL base da sua API
    headers: {
        'Content-Type': 'application/json',
        'authorization': '123456'
    }
});

export default instance;