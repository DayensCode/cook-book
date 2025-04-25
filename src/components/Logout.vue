<template>
  <div class="flex">
    <SvgIcon class="logout" name="logout"/>
    <span>Выйти</span>
  </div>
</template>
  
<script setup lang="ts">
import SvgIcon from "./SvgIcon.vue";
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
