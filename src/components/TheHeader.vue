<template>
  <div class="header">
    <div class="container container_header">
      <ul class="flex">
        <li><img alt="logo" src="../assets/img/logo.png"></li>
        <li>Подборки</li>
        <li>Сохраненное</li>
      </ul>
      <div class="flex">
        <!-- <img alt="user" src="./assets/logo.png"> -->
        <span>kitchener14</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #E3CBBC;

  .container_header {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
  }
}

ul {
  gap: 29px;
  list-style: none;
}
</style>
