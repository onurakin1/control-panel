import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    template: localStorage.getItem('template') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    setAuthData(token, user, template) {
      this.token = token;
      this.user = user;
      this.template = template;
      localStorage.setItem('token', token);
      localStorage.setItem('template', template);
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearAuthData() {
      this.token = null;
      this.user = null;
      this.template = null;
      localStorage.removeItem('token');
      localStorage.removeItem('template');
      localStorage.removeItem('user');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getTemplate:(state) => state.template,
    getUser: (state) => state.user,
  },
});
