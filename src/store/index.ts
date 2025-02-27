import { createStore } from 'vuex';

interface State {
  recipes: any[];
  loading: boolean;
  error: string | null;
  query: string; 
}

export default createStore({
  state: (): State => ({
    recipes: [],
    loading: false,
    error: null,
    query: 'chicken', 
  }),
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    setQuery(state, query) {
      state.query = query;
    }
  },
  actions: {
    async fetchRecipes({ commit, state }) {
      if (!state.query.trim()) { 
        commit("setRecipes", []);
        commit("setError", null);
        return;
      }
      commit('setLoading', true);

      commit("setError", null);
      try {
        const url = `https://api.api-ninjas.com/v1/recipe?query=${state.query}`; 
        const options = {
          method: 'GET',
          headers: { 'X-Api-Key': 'ALvWHZLDAdySJBsa9V2e0A==5fAkils1kXZmvXVB'},
          contentType: 'application/json',
        };
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length) {
          commit("setRecipes", data);
        } else {
          commit("setRecipes", []);
          commit("setError", "Рецепты не найдены");
        }
      }catch (error) {
        commit('setError', 'Ошибка при загрузке рецептов');
      } finally {
        commit('setLoading', false);
      }
    },
    updateQuery({ commit, dispatch }, query) { 
      commit('setQuery', query);
      dispatch('fetchRecipes'); 
    }
  },
  getters: {
    recipes: (state) => state.recipes,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
    query: (state) => state.query,
  }
});
