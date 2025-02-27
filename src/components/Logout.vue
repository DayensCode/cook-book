<template>
    <div @click="logout">
        <SvgIcon class="logout" name="logout"/>
    </div>
  </template>
  
  <script>
  import { logout } from "@/helpers/authorization";
import SvgIcon from "./SvgIcon.vue";
  
  export default {
    components: {SvgIcon},
    inject: ["globalState"],
    methods: {
      logout() {
        logout();
        this.globalState.isAuthorized = false;
        this.globalState.isAdmin = false;
        this.globalState.user = null;
        alert("Вы вышли из аккаунта");
      },
    },
  };
  </script>

  <style lang="scss" scoped>

  .logout {
    cursor: pointer;
	width: 22px;
	height: 22px;
	color: white;
}
</style>
  