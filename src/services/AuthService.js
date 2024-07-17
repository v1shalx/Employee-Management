// src/services/AuthService.js
import axios from 'axios';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token); // Store token in local storage or session storage
      return response.data; // You may want to return additional user data if needed
    } catch (error) {
      throw error; // Propagate error to handle in Login component
    }
  }
};

export default AuthService;
