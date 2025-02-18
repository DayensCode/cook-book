<template>
  <header class="header">
    <nav class="container container_header">
      <div class="left-nav">
        <router-link to="/"><SvgIcon class="logo" name="logo" /></router-link>
        <router-link to="/recipe-collections">Подборки</router-link>
        <router-link to="/saved-recepies">Сохраненное</router-link>
      </div>
      <div class="user">
        <router-link to="/authorization">
          <SvgIcon class="account" name="account"/>
          <span>kitchener14</span>
        </router-link>
      </div>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import SvgIcon from "./SvgIcon.vue";

export default {
  name: "TheHeader",
  components: { SvgIcon },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #e3cbbc;

  .container_header {
    padding: 24px 0 32px;
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
  }
}

.logo {
  width: 104px;
  height: 30px;
  margin-right: 70px;
}

.account {
  width: 22px;
  height: 22px;
  margin-right: 18px;
}
</style>
