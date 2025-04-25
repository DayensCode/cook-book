import { defineStore } from "pinia";
import { recipeService } from '@/service/recipeService';

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
    async fetchRecipes(authorId?: number | null, ignoreFilters = false) {
      this.loading = true;
      this.error = null;

      try {
        const params = new URLSearchParams();

        if (this.query.trim()) {
          params.append("search", this.query.trim());
        }

        if (!ignoreFilters) {
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
        }

        if (authorId) {
          params.append("author_id", authorId.toString());
        }

        const data = await recipeService.getRecipes(params);

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
