<template>
  <div class="container">
    <div class="content">
      <RecipeCard
        v-for="recipe in recipes" 
        :key="recipe.id"
        :title="recipe.title"
        :time="recipe.cooking_time"
        :instruction="recipe.content"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { authService } from '@/service/authService';
import { useAuthStore } from '@/store/auth';
import { useRecipeStore } from '@/store/index';
const authStore = useAuthStore();
const recipeStore = useRecipeStore();
const { recipes } = storeToRefs(recipeStore);

import RecipeCard from "@/components/RecipeCard.vue";

onMounted(async () => {
  if (authStore.token) {
    try {
      const user = await authService.getCurrentUser(authStore.token);
      authStore.setId(user.id);
      recipeStore.fetchRecipes(authStore.id, true);
    } catch (error) {
      console.error('Не удалось получить ID пользователя:', error);
    }
  }
});
</script>
