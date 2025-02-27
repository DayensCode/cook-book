<template>
  <div class="container">
    <TheSearch />

    <div class="content">
      <div class="aside">
        <h3>создай подборку</h3>
        <input type="text" placeholder="Мои рецепты ..." />
        <button>Создать</button>
      </div>
      <div>
        <div v-if="loading">Загрузка...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="query.trim() === ''" class="error">Введите запрос, чтобы найти рецепты</div>

     
      <div v-if="recipes.length">
        <TheCard
        v-for="(recipe, index) in recipes"
        :key="index"
        :title="recipe?.title"
        :ingredients="recipe?.ingredients"
        :servings="recipe?.servings"
        :instructions="recipe?.instructions"

          @openModal="openModal(recipe)"
      /></div>
      </div>
    </div>
    <RecipeCardModal v-if="selectedRecipe" :recipe="selectedRecipe" @close="closeModal" />
  
  </div>
</template>

<script>
import TheSearch from "./TheSearch.vue";
import TheCard from "./TheCard.vue";
import { mapActions, mapGetters } from "vuex";
import RecipeCardModal from "./modals/RecipeCardModal.vue";

export default {
  name: "CardList",
  components: { TheSearch, TheCard , RecipeCardModal},
  data() {
    return {
      selectedRecipe: null 
    };
  },
  mounted() {
    this.fetchRecipes(); 
  },
  watch: {
    query() {
      this.fetchRecipes(); 
    }
  },

  computed: {
    ...mapGetters(["recipes", "isLoading", "error", "query"]),
    loading() {
      return this.isLoading;
    }
  },
  methods: {
    ...mapActions(['fetchRecipes']),
    openModal(recipe) {
      this.selectedRecipe = recipe;
    },
    closeModal() {
      this.selectedRecipe = null; 
    }
  }
};

</script>

<style lang="scss" scoped>
.content {
  margin-top: 30px;
  display: flex;
  gap: 42px;
}

.error{
  color: black;
}

.aside {
  padding: 45px 35px 48px;
  height: fit-content;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-image: url("../assets/img/aside.png");
  background-size: cover;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(213, 177, 155, 0.65);
    border-radius: 18px;
  }

  h3 {
    text-transform: uppercase;
    white-space: nowrap;
    position: relative;
    z-index: 2;
  }

  input {
    margin-top: 38px;
    padding: 15px 0 15px 15px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    font-size: 16px;
  }

  button {
    margin-top: 22px;
    width: 100%;
    display: block;

    padding: 12px 0;
    background-color: #9bd5b1;
    border: none;
    border-radius: 20px;

    font-size: 18px;
    color: #fff;
    position: relative;
    z-index: 2;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #8ec6a3;
    }
  }
}
</style>
