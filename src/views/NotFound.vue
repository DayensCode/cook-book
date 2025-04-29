<template>
  <div class="layout flex">
    <div class="not-found">
      <span class="title">
        404
      </span>
      <span>Страница не найдена</span>
      <p class="back-button" @click="goBack">Назад</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;

  font-size: 30px;

}

.title {
  font-size: 180px;
}

.back-button {
  border-bottom: 1px solid white;
  color: white;
  cursor: pointer;
  font-size: 30px;

}
</style>