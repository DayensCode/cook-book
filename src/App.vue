<template>
  <TheHeader />
  <TheSlider />
  <CardList />
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheSlider from './components/TheSlider.vue'
import CardList from './components/CardList.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheSlider,
    CardList
  }
}
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  color: #fff;
  background-image: url("./assets/img/bg.png");
}
</style>
