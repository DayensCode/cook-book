<template>
  <div>
    <header class="header">
      <nav class="container container_header">
        <router-link to="/"><SvgIcon class="logo" name="logo" /></router-link>
        <router-link to="/saved-recepies">Подборки</router-link>
        <router-link to="/recipe-collections">Сохраненное</router-link>
        <div class="flex user">
          <router-link to="/authorization"
            ><SvgIcon class="account" name="account"
          /></router-link>
          <span>kitchener14</span>
        </div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
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

    .logo {
      width: 104px;
      height: 30px;
    }
  }
}

ul {
  gap: 29px;
  list-style: none;
  align-items: flex-end;

  li:first-of-type {
    margin-right: 70px;
    display: flex;
  }
}

.user {
  align-items: flex-end;

  .account {
    width: 22px;
    height: 22px;
    margin-right: 18px;
  }
}
</style>
