<template>
  <div class="search flex">
    <el-input class="search-input" v-model="searchQuery" type="text" @keyup.enter="searchRecipes" placeholder="Например, рецепты вторых блюд ..." clearable />
    <el-button class="btn-light-green"  @click="searchRecipes" :disabled="!searchQuery.trim()">Найти</el-button>
  </div>

</template>
  
<script>
import { mapActions } from 'vuex';

export default {
  name: "TheSearch",
  computed: {
    searchQuery: {
      get() {
        return this.$store.getters.query; 
      },
      set(value) {
        this.$store.commit("setQuery", value); 
      }
    }
  },
  methods: {
    ...mapActions(["fetchRecipes"]),
    searchRecipes() {
      if (this.searchQuery.trim()) { 
        this.fetchRecipes();
      }
    }
  }
};
</script>
  
<style lang="scss" scoped>
.search {
  margin-top: 32px;
  gap: 20px;

  .search-input {
    padding: 14px 31px;
    width: 100%;
    background-color: #e3cbbc;
    border: 2px solid #e3cbbc;
    border-radius: 3px;
    outline: none;
    font-size: 16px;
  }


}
</style>
