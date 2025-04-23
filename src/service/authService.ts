import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

export const authService = {
  async login(username: string, password: string) {
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    const { data } = await api.post('/auth/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data;
  },

  async register(username: string, password: string) {
    const { data } = await api.post('/auth/register', {
      login: username,
      password,
    });

    return data;
  },
};
