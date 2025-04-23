import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

export const recipeService = {
  async getRecipes(params: URLSearchParams) {
    const { data } = await api.get(`/recipes?${params.toString()}`);
    return data;
  },

  async getCategories() {
    const { data } = await api.get('/recipes/types');
    return data;
  },

  async getCuisines() {
    const { data } = await api.get('/recipes/cuisines');
    return data;
  },

  async getHashtags() {
    const { data } = await api.get('/recipes/hashtags');
    return data;
  },

  async createRecipe(payload: {
    title: string;
    cooking_time: number;
    dish_type_id: number;
    cuisine_id: number;
    content: string;
    hashtags: number[];
  }, token: string | null) {
    const { data } = await api.post('/recipes', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};
