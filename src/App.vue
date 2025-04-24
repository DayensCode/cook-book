<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

onMounted(() => {
  authStore.loadSessionFromStorage();
});
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  color: #fff;
  background-image: url("./assets/img/pattern.png");
  background-size: cover;
  min-height: 100vh;
}
</style>
