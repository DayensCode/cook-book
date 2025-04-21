<template>
  <header class="header">
    <div class="flex container container_header">
      <router-link to="/" class="flex">
        <SvgIcon class="logo" name="logo" />
      </router-link>

      <el-input
        v-model="query"
        class="search-input"
        placeholder="Искать в CookBook"
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
          <router-link to="/account" class="user-info flex">
            <SvgIcon class="account" name="account" />
            <span>{{ username }}</span>
          </router-link>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/saved-recepies" class="flex">
                  <SvgIcon name="favorite" />
                  <span>Избранное</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/recipe-collections" class="flex">
                  <SvgIcon name="created" />
                  <span>Созданное</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
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
import { storeToRefs } from "pinia";
import { useRecipeStore } from "@/store/index";
import { useAuthStore } from "@/store/auth";

import Logout from "./Logout.vue";
import SvgIcon from "./SvgIcon.vue";

const recipeStore = useRecipeStore();
const { query } = storeToRefs(recipeStore);

const authStore = useAuthStore();
const { isAuthorized, username } = storeToRefs(authStore);

function searchRecipes() {
  recipeStore.fetchRecipes();
}
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
    cursor: pointer;
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

.el-popper {
  top: 80px !important;
}
</style>