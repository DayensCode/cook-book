import { defineStore } from 'pinia';

interface AuthState {
  token: string | null;
  isAuthorized: boolean;
  username: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    isAuthorized: false,
    username: null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      this.isAuthorized = true;
      localStorage.setItem('access_token', token);
    },
    setUsername(username: string) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    loadUserFromStorage() {
      const token = localStorage.getItem('access_token');
      const username = localStorage.getItem('username');
      if (token && username) {
        this.token = token;
        this.username = username;
        this.isAuthorized = true;
      }
    },
    logout() {
      this.token = null;
      this.username = null;
      this.isAuthorized = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
    },
  },
});
