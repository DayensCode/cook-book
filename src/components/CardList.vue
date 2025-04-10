<template>
  <div class="container">
    <div class="content">
      <div class="aside">
        <h3>добавь свой рецепт</h3>
        <input type="text" placeholder="Блинчики с мясом ..." />
        <button>Создать</button>
      </div>

      <div class="card-list">
        <div v-if="loading" class="no-value">Загрузка...</div>
        <div v-if="error" class="no-value">{{ error }}</div>
        <div v-if="recipes?.length">
          <TheCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :title="recipe.title"
            :category="recipe.dish_type.name"
            :instruction="recipe.content"
            :time="recipe.cooking_time"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRecipeStore } from '@/store/index';

import TheCard from "./TheCard.vue";

const recipeStore = useRecipeStore();
const { recipes, error, loading } = storeToRefs(recipeStore);

onMounted(() => {
  recipeStore.fetchRecipes();
});
</script>

<style lang="scss" scoped>
.content {
  margin-top: 40px;
  display: flex;
  gap: 40px;
}

.aside {
  padding: 45px 35px 48px;
  height: fit-content;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-image: url("../assets/img/aside.png");
  background-size: cover;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(213, 177, 155, 0.65);
    border-radius: 18px;
  }

  h3 {
    text-transform: uppercase;
    white-space: nowrap;
    position: relative;
    z-index: 2;
    font-size: 18px;
  }

  input {
    margin-top: 38px;
    padding: 15px 0 15px 15px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    font-size: 16px;
  }

  button {
    margin-top: 22px;
    width: 100%;
    display: block;

    padding: 12px 0;
    background-color: #9bd5b1;
    border: none;
    border-radius: 20px;

    font-size: 18px;
    color: #fff;
    position: relative;
    z-index: 2;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #8ec6a3;
    }
  }
}

.card-list {
  flex: 1;
}
</style>
