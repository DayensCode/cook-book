<template>
  <div class="container">
    <TheSearch />

    <div class="content">
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  </div>
</template>

<script>
import TheSearch from "@/components/TheSearch.vue";
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "SavedRecipes",
  components: { TheSearch, RecipeCard },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
</style>
