// src/authService.js
import axios from './configApi';

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await axios.post('/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        // Você pode querer armazenar informações adicionais do usuário aqui
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('userToken');
    // Limpe outras informações armazenadas do usuário aqui, se houver
  },

  getCurrentUserToken: () => {
    return localStorage.getItem('userToken');
  },

  // Adicione mais métodos relacionados à autenticação conforme necessário
};

export default AuthService;
