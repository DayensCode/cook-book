import { defineStore } from 'pinia';

interface AuthState {
  token: string | null;
  isAuthorized: boolean;
  username: string | null;
  id: number | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    isAuthorized: false,
    username: null,
    id: null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      this.isAuthorized = true;
      localStorage.setItem('access_token', token);
    },
    setUsername(username: string) {
      this.username = username;
    },
    setId(id: number) {
      this.id = id;
    },
    loadSessionFromStorage() {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.token = token;
        this.isAuthorized = true;
      }
    },
    logout() {
      this.token = null;
      this.username = null;
      this.isAuthorized = false;
      this.id = null;
      localStorage.removeItem('access_token');
    },
  },
});
