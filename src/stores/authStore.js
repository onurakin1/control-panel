import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    company: localStorage.getItem('company') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    tokenExpiry: localStorage.getItem('tokenExpiry') || null,
  }),
  actions: {
    setAuthData(token, user, company, expiresIn) {
 
      const expiryTime = expiresIn ? new Date().getTime() + expiresIn * 1000 : new Date().getTime() + 3600 * 1000;
      
      this.token = token;
      this.user = user;
      this.company = company;
      this.tokenExpiry = expiryTime;
    
      localStorage.setItem('token', token);
      localStorage.setItem('company', company);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('tokenExpiry', expiryTime);
    },
    clearAuthData() {
      this.token = null;
      this.user = null;
      this.company = null;
      this.tokenExpiry = null;
      localStorage.removeItem('token');
      localStorage.removeItem('company');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
    },
    checkTokenExpiry() {
      const now = new Date().getTime();
      if (this.tokenExpiry && now > this.tokenExpiry) {
        this.clearAuthData();
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token && new Date().getTime() < state.tokenExpiry,
    getTemplate: (state) => state.company,
    getUser: (state) => state.user,
  },
});