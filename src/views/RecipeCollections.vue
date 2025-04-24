<template>
  <div class="container">
    <div class="content">
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRecipeStore } from '@/store/index';
const authStore = useAuthStore();
const recipeStore = useRecipeStore()

import RecipeCard from "@/components/RecipeCard.vue";

onMounted(() => {
  recipeStore.fetchRecipes(authStore.id);
});
</script>

<style scoped lang="scss">
.content {
  margin-top: 30px;
  padding: 32px 40px 0;
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 13px;
}
</style>
