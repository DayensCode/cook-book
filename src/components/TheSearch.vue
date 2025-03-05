<template>
  <div class="search flex">
    <el-input class="search-input" v-model="searchQuery" type="text" @keyup.enter="searchRecipes" placeholder="Например, рецепты вторых блюд ..." clearable />
    <el-button class="btn-light-green" @click="searchRecipes" :disabled="!searchQuery.trim()">Найти</el-button>
  </div>
  <div class="switchers" v-if="$route.path === '/saved-recepies'">
    <div>
      <el-switch v-model="fastCooking" class="search-toggle" />
      <span class="toggle-label">Быстро приготовить</span>
    </div>

    <div>
      <el-switch v-model="hightProtein" class="search-toggle" />
      <span class="toggle-label">Много белка</span>
    </div>

    <div>
      <el-switch v-model="meatless" class="search-toggle" />
      <span class="toggle-label">Постное</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "TheSearch",
  data() {
    return {
      fastCooking: false,
      hightProtein: false,
      meatless: false
    };
  },
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
  margin: 32px 0 20px;
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

.switchers {
  display: flex;
  gap: 24px;

  .search-toggle {
    margin-right: 12px;
  }

  .toggle-label {
    font-size: 16px;
    color: #796761;
  }

  :deep(.el-switch__core) {
    background-color: #BFBFBF !important;
    border-color: #BFBFBF !important;
  }

  :deep(.el-switch.is-checked .el-switch__core) {
    background-color: #9BD5B1 !important;
    border-color: #9BD5B1 !important;
  }
}
</style>
