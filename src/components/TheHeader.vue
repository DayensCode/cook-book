<template>
  <header class="header">
    <div class="flex container container_header">
      <router-link to="/" class="flex">
        <SvgIcon class="logo" name="logo" />
      </router-link>

      <el-input
        class="search-input"
        placeholder="Например, рецепты вторых блюд ..."
        clearable
      >
        <template #suffix>
          <SvgIcon class="search-icon" name="search" />
        </template>
      </el-input>

      <div>
        <el-dropdown v-if="globalState.isAuthorized" trigger="hover">
          <router-link to="/account" class="user-info flex">
            <SvgIcon class="account" name="account" />
            <span>{{ userInfo?.username }}</span>
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

        <router-link v-if="!globalState.isAuthorized" to="/authorization" class="flex">
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

<script>
import Logout from "./Logout.vue";
import SvgIcon from "./SvgIcon.vue";

export default {
  name: "TheHeader",
  components: { SvgIcon, Logout },

  inject: ["globalState"],
  computed: {
    userInfo() {
      return this.globalState.user
    }
  }
};
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
  background-color: #C9B5A8;

  &>:first-child {
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
</style>