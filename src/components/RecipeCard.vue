<template>
  <div class="recipe-card">
    <img alt="recipe-card" src="../assets/img/recipe-card.png" />
    <div class="description flex">
      <h3>Постный салат</h3>
      <SvgIcon class="like-fill" name="like-fill" />
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon.vue";

export default {
  name: "RecipeCard",
  components: { SvgIcon },
};
</script>

<style lang="scss" scoped>
.recipe-card {
  background-color: #e3cbbc;

  .description {
    padding: 15px 20px 20px;
    justify-content: space-between;
  }
}

.like,
.like-fill {
  width: 16px;
  height: 16px;
}
</style>
