import axios from 'axios';

const API_BASE_URL = 'http://localhost:5170/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  usuario: {
    id: string;
    email: string;
    nombre: string;
  };
}

export const authService = {
  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/Auth/login`, loginData);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
    }
    
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};