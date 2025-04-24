<template>
  <TheSlider />
  <CardList />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { authService } from '@/service/authService';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

import TheSlider from '@/components/TheSlider.vue';
import CardList from '@/components/CardList.vue';

onMounted(async () => {
  if (authStore.token) {
    try {
      const user = await authService.getCurrentUser(authStore.token);
      authStore.setId(user.id);
      authStore.setUsername(user.login);
    } catch (error) {
      console.error('Не удалось получить данные пользователя:', error);
    }
  }
});
</script>
