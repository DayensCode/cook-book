<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

onMounted(() => {
  authStore.loadUserFromStorage();
});
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  color: #fff;
  background-size: contain;
  background-image: url("./assets/img/back.png");
  background-position: center;
  min-height: 100vh;
}
</style>
