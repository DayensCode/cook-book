<template>
  <button @click="goBack">{{ '<-' }}</button>
    <div class="layout" >Добро пожаловать
    <label  >Электронная почта</label>
    <input type="email"/>
    <label >Пароль</label>
    <input type="text"/>
</div>
  </template>

  
<script>


export default {
  name: 'App',
  methods: {
    goBack() {
      window.history.back(); // Возвращает пользователя на предыдущую страницу
    }
  }
}



</script>


<style lang="scss" scoped>
.layout {
    min-height: 48rem;
height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10rem;
  align-items: center;
}
</style>

