import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.modelojuaprofessor.com.br/', // Substitua pela URL base da sua API
    headers: {
        'Content-Type': 'application/json',
        'authorization': '123456'
    }
});

export default instance;