<template>
  <div class="container">
    <div class="content">
      <RecipeCard
        v-for="recipe in recipes" 
        :key="recipe.id"
        :title="recipe.title"
        :time="recipe.cooking_time"
        :instruction="recipe.content"
        @click="goToRecipe(recipe.id)"
        @open="openModal(recipe.id)"
      />
    </div>

    <BaseModal v-if="isModalOpen" @close="isModalOpen = false">
      <div class="modal">
        <h2 class="modal-title">Подтверждение</h2>
        <p class="modal-text">Подтвердите, пожалуйста, удаление рецепта</p>
        <div class="modal-buttons">
          <button class="modal-btn modal-btn_cancel" @click="handleCancel">Закрыть</button>
          <button class="modal-btn modal-btn_confirm" @click="handleDelete">Подтверждаю</button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { authService } from '@/service/authService';
import { recipeService } from '@/service/recipeService';
import { useAuthStore } from '@/store/auth';
import { useRecipeStore } from '@/store/index';
const authStore = useAuthStore();
const recipeStore = useRecipeStore();
const { recipes } = storeToRefs(recipeStore);

import RecipeCard from "@/components/RecipeCard.vue";
import BaseModal from "@/components/BaseModal.vue";

const router = useRouter();

const isModalOpen = ref(false);
const recipeToDeleteId = ref<number | null>(null);

const goToRecipe = (recipeId: number) => {
  router.push(`/recipe/${recipeId}`);
};

const openModal = (recipeId: number) => {
  isModalOpen.value = true;
  recipeToDeleteId.value = recipeId;
};

const handleDelete = async () => {
  if (recipeToDeleteId.value !== null && authStore.token) {
    try {
      await recipeService.deleteRecipe(recipeToDeleteId.value, authStore.token);
      await recipeStore.fetchRecipes(authStore.id, true);
    } catch (error) {
      console.error('Ошибка при удалении рецепта:', error);
    } finally {
      isModalOpen.value = false;
      recipeToDeleteId.value = null;
    }
  }
};

const handleCancel = () => {
  isModalOpen.value = false;
  recipeToDeleteId.value = null;
};

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

<style lang="scss" scoped>
.modal {
  text-align: center;
  color: #2F2222;

  &-title {
    margin: 0 0 20px;
    font-size: 28px;
    font-weight: 700;
  }

  &-text {
    font-size: 20px;
    margin-bottom: 24px;
  }

  &-buttons {
    display: flex;
    justify-content: space-between;
  }

  &-btn {
    padding: 10px 19px;
    border-radius: 18px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;

    &_cancel {
      background: white;
      border: 1px solid #847D7D;
      color: #847D7D;
      transition: all 0.2s linear;

      &:hover {
        background: #f0f0f0;
        border-color: #6e6e6e;
        color: #6e6e6e;
      }
    }

    &_confirm {
      background: #9BD5B1;
      border: none;
      color: #fff;
      transition: background 0.2s linear;

      &:hover {
        background: #8ec6a3;
      }
    }
  }
}
</style>