<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const globalState = inject("globalState");
    return { globalState };
  },
})
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
}
</style>
