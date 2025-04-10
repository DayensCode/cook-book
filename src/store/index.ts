import { defineStore } from "pinia";

interface State {
  recipes: any[];
  loading: boolean;
  error: string | null;
  query: string;
}

export const useRecipeStore = defineStore("recipeStore", {
  state: (): State => ({
    recipes: [],
    loading: false,
    error: null,
    query: "",
  }),
  actions: {
    async fetchRecipes() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`http://localhost:8080/api/v1/recipes?search=${this.query.trim()}`);
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length) {
          this.recipes = data;
        } else {
          this.recipes = [];
          this.error = "Рецепты не найдены";
        }

      } catch (error) {
        this.error = "Ошибка при загрузке рецептов";
      } finally {
        this.loading = false;
      }
    }
  }
});
