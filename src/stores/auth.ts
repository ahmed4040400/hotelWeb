import { defineStore } from 'pinia';
import { authService } from '../services/api';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isManager: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isManager: localStorage.getItem('userRole') === 'manager'
  }),
  
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await authService.login(email, password);
        const { token, ...user } = response.data;
        
        this.user = user;
        this.token = token;
        this.isAuthenticated = true;
        this.isManager = user.role === 'manager';
        
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', user.role);
        
        return { success: true };
      } catch (error: any) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Login failed' 
        };
      }
    },
    
    async register(userData: any) {
      try {
        const response = await authService.register(userData);
        const { token, ...user } = response.data;
        
        this.user = user;
        this.token = token;
        this.isAuthenticated = true;
        this.isManager = user.role === 'manager';
        
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', user.role);
        
        return { success: true };
      } catch (error: any) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Registration failed' 
        };
      }
    },
    
    async fetchUserProfile() {
      if (!this.token) return;
      
      try {
        const response = await authService.getUserProfile();
        this.user = response.data;
        // Add null check before accessing this.user.role
        this.isManager = this.user?.role === 'manager';
        // Only set userRole in localStorage if user exists
        if (this.user) {
          localStorage.setItem('userRole', this.user.role);
        }
        return { success: true };
      } catch (error) {
        return { success: false };
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.isManager = false;
      
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    }
  }
});