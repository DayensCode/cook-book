<template>
  <header class="header">
    <div class="flex container container_header">
      <router-link to="/" class="flex">
        <SvgIcon class="logo" name="logo" />
      </router-link>

      <el-input
        v-if="!isRecipePage"
        v-model="query"
        class="search-input"
        :placeholder="placeholderText"
        clearable
        @clear="searchRecipes"
        @keyup.enter="searchRecipes"
      >
        <template #suffix>
          <div class="search-icon-bg flex">
            <SvgIcon class="search-icon" name="search" @click="searchRecipes" />
          </div>
        </template>
      </el-input>

      <div>
        <el-dropdown v-if="isAuthorized" trigger="hover">
          <div class="user-info flex">
            <SvgIcon class="account" name="account" />
            <span>{{ username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="menu-list">
              <router-link to="/saved-recipes" class="no-decorated">
                <el-dropdown-item>
                  <SvgIcon name="favorite" />
                  <span>Избранное</span>
                </el-dropdown-item>
              </router-link>
              <router-link to="/recipe-collections" class="no-decorated">
                <el-dropdown-item>
                  <SvgIcon name="created" />
                  <span>Созданное</span>
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item @click="handleLogout">
                <Logout />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <router-link v-if="!isAuthorized" to="/authorization" class="flex">
          <SvgIcon class="login" name="login" />
          <p>Войти</p>
        </router-link>
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRecipeStore } from "@/store/index";
import { useAuthStore } from "@/store/auth";
import { useRoute, useRouter } from 'vue-router';

import Logout from "./Logout.vue";
import SvgIcon from "./SvgIcon.vue";

const recipeStore = useRecipeStore();
const { query } = storeToRefs(recipeStore);

const authStore = useAuthStore();
const { isAuthorized, username } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();

const searchRecipes = () => {
  if (route.name === 'RecipeCollections') {
    recipeStore.fetchRecipes(authStore.id, true);
  } else {
    recipeStore.fetchRecipes();
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

const isRecipePage = computed(() => route.name === 'RecipeDetails');

const placeholderText = computed(() => {
  switch (route.name) {
    case "MainPage":
      return "Искать в CookBook";
    case "SavedRecipes":
      return "Искать в избранных рецептах";
    case "RecipeCollections":
      return "Искать в созданных рецептах";
    default:
      return "Поиск рецептов...";
  }
});
</script>

<style lang="scss" scoped>
.header {
  background-color: #e3cbbc;

  .container_header {
    padding: 1.5rem 3rem;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  .search-input {
    max-width: 740px;
  }

  .search-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .search-icon-bg {
    background-color: #C9B5A8;
    height: 100%;
  }

  .user-info {
    cursor: default;
    color: #fff;
    font-size: 18px;
    outline: none !important;
  }
}

.logo {
  width: 104px;
  height: 30px;
}

.account, .login {
  width: 22px;
  height: 22px;
  margin-right: 0.5rem;
}

:deep(.el-input__wrapper) {
  padding-right: 0;
  padding: 0 0 0 17px;
  border: 1px solid #C9B5A8;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
}

:deep(.el-input__suffix-inner) {
  flex-direction: row-reverse;

  &>div>:first-child {
    margin: 0 10px;
  }
}

.el-dropdown-menu {
  width: 288px;
  background-color: #E3CBBC;
  padding: 0;
}
</style>

<style lang="scss">
.el-popper__arrow::before {
  display: none;
}

.el-dropdown__popper.el-popper {
  border: none !important;
  box-shadow: none !important;
}

.el-dropdown-menu__item {
  color: white !important;
  font-size: 18px !important;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  padding: 18px 18px !important;

  a {
    text-decoration: none;
    color: white;
  }

  svg {
    width: 22px;
    height: 22px;
    margin-right: 8px;
  }
}

.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #C9B5A8 !important;
}

.el-dropdown-menu {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

.el-popper:has(.menu-list) {
  top: 80px !important;
}

.el-popper {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
}
</style>