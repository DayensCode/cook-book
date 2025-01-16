<template>
  <div class="header">
    <div class="container container_header">
      <ul class="flex">
        <li><SvgIcon class="logo" name="logo" /></li>
        <li>Подборки</li>
        <li>Сохраненное</li>
      </ul>
      <div class="flex user">
        <SvgIcon class="account" name="account" />
        <span>kitchener14</span>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from './SvgIcon.vue'

export default {
  name: 'TheHeader',
  components: { SvgIcon }
}
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
