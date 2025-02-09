<template>
  <TheSlider />
  <CardList />
</template>

<script>
import CardList from "@/components/CardList.vue";
import TheSlider from "@/components/TheSlider.vue";

export default {
  name: "MainPage",
  components: {
    TheSlider,
    CardList,
  },
};
</script>

<style></style>
