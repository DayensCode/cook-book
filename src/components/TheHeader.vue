<template>
  <header class="header">
    <nav class="container container_header">
      <div class="left-nav">
        <router-link to="/">
          <SvgIcon class="logo" name="logo" />
        </router-link>
        <router-link to="/recipe-collections">Подборки</router-link>
        <router-link to="/saved-recepies" v-if="globalState.isAuthorized">Сохраненное</router-link>
      </div>
      <div class="user">
        <router-link v-if="globalState.isAuthorized" to="/account">
          <SvgIcon class="account" name="account" />
        </router-link>

        <router-link v-if="!globalState.isAuthorized" to="/authorization" class="login-container">

          <SvgIcon class="login" name="login" />
          <p>Войти в аккаунт</p>
        </router-link>
        <span>{{ userInfo?.username }}</span>
        <Logout v-if="globalState.isAuthorized" />

      </div>
    </nav>
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
      const user = this.globalState.user;
      console.log(user)
      return user
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #e3cbbc;

  .container_header {
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  .left-nav {
    a {
      margin-right: 30px;
    }
  }

  .user {
    display: flex;
    align-items: flex-end;
    gap: 1.5rem
  }
}

.login-container{
  display: flex;
  gap: 1rem
}

.logo {
  width: 104px;
  height: 30px;
  margin-right: 70px;
}

.account, .login {
  width: 22px;
  height: 22px;
}
</style>
