<template>
  <div @click="handleLogout" class="flex">
    <SvgIcon class="logout" name="logout"/>
    <span>Выйти</span>
  </div>
</template>
  
<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import SvgIcon from "./SvgIcon.vue";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style lang="scss" scoped>
.logout {
  display: block;
  cursor: pointer;
	width: 22px;
	height: 22px;
	color: white;
}
</style>
