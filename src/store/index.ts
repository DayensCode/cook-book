import { defineStore } from "pinia";

interface State {
  recipes: any[];
  loading: boolean;
  error: string | null;
  query: string;
  selectedHashtags: number[];
  selectedCategory: string;
  selectedCuisine: string;
  selectedMaxTime: number | null;
}

export const useRecipeStore = defineStore("recipeStore", {
  state: (): State => ({
    recipes: [],
    loading: false,
    error: null,
    query: "",
    selectedHashtags: [],
    selectedCategory: "",
    selectedCuisine: "",
    selectedMaxTime: null,
  }),
  actions: {
    async fetchRecipes() {
      this.loading = true;
      this.error = null;

      try {
        const params = new URLSearchParams();

        if (this.query.trim()) {
          params.append("search", this.query.trim());
        }

        if (this.selectedHashtags.length > 0) {
          this.selectedHashtags.forEach((id) => {
            params.append("hashtags", id.toString());
          });
        }

        if (this.selectedCategory) {
          params.append("dish_types", this.selectedCategory);
        }

        if (this.selectedCuisine) {
          params.append("cuisines", this.selectedCuisine);
        }

        if (this.selectedMaxTime) {
          params.append("max_cooking_time", this.selectedMaxTime.toString());
        }

        const response = await fetch(`http://localhost:8080/api/v1/recipes?${params.toString()}`);
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
