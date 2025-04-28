<template>
  <div class="container recipe-details">
    <section class="recipe-main">
      <img class="recipe-image" alt="фото готового блюда" src="../assets/img/card.png" />

      <div class="recipe-info">
        <h1 class="recipe-title">{{ recipe?.title }}</h1>
        <h2 class="ingredients-title">ингредиенты</h2>
        <ul class="ingredients-list">
          <li v-for="(item, index) in ingredients" :key="index">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section class="recipe-instructions">
      <h2 class="instructions-title">инструкция приготовления</h2>
      <ol class="instructions-list">
        <li v-for="(step, index) in instructions" :key="index">{{ step }}</li>
      </ol>
    </section>

    <button class="back-button" @click="goBack">Назад</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { recipeService } from '@/service/recipeService'
import { formatTime, formatIngredients } from '@/helpers/index';

const router = useRouter()
const route = useRoute()

const id = route.params.id as string
const recipe = ref(null)

const goBack = () => {
  router.back()
}

const ingredients = computed(() => {
  if (!recipe.value || !recipe.value.content) {
    return [];
  }
  return formatIngredients(recipe.value.content);
});

const instructions = computed(() => {
  if (!recipe.value?.content) return [];

  const content = recipe.value.content;
  const withoutIngredients = content.replace(/^Ингредиенты:.*?\.\s*/i, '');

  return withoutIngredients.split('.')
    .map(item => item.trim())
    .filter(item => item.length > 0);
});

onMounted(async () => {
  try {
    recipe.value = await recipeService.getRecipeById(id)
  } catch (error) {
    console.error('Ошибка при загрузке рецепта:', error)
  }
})
</script>

<style lang="scss" scoped>
.recipe-details {
  margin-top: 90px;
  color: #2F2222;
  display: flex;
  flex-direction: column;

  .recipe-main {
    display: flex;
    gap: 2rem;
    align-items: stretch;

    .recipe-image {
      width: 300px;
      height: auto;
      object-fit: cover;
      border-radius: 12px;
    }

    .recipe-info {
      padding: 2rem;
      flex: 1;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .recipe-title {
      margin: 0;
      font-size: 3rem;
    }

    .ingredients-title {
      margin: 30px 0 22px;
      text-transform: uppercase;
      color: #ACA7A7;
      font-size: 1.5rem;
    }

    .ingredients-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      padding-left: 1rem;
    }
  }

  .recipe-instructions {
    margin: 2rem 0;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);

    .instructions-title {
      margin: 0 0 22px;
      text-transform: uppercase;
      color: #ACA7A7;
      font-size: 1.5rem;
    }

    .instructions-list {
      margin: 0;
      padding-left: 1.5rem;
      line-height: 1.6;
    }
  }

  .back-button {
    align-self: flex-end;
    color: #2F2222;
    background-color: #e8cfc1;
    border: none;
    padding: 10px 42px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #d4b6a7;
    }
  }
}
</style>