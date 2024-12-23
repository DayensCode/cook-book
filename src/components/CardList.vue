<template>
  <div class="container">
    <div class="search flex">
      <input type="text" placeholder="Например, рецепты вторых блюд ...">
      <button>Найти</button>
    </div>

    <div class="content">
      <div class="aside">
        <h3>создай подборку</h3>
        <input type="text" placeholder="Мои рецепты ...">
        <button>Создать</button>
      </div>

      <div>
        <div class="card">карточка</div>
        <div class="card">карточка</div>
        <div class="card">карточка</div>
        <div class="card">карточка</div>
        <div class="card">карточка</div>
        <div class="card">карточка</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardList'
}
</script>

<style lang="scss" scoped>
.search {
  margin-top: 32px;
  gap: 20px;

  input {
    padding: 14px 31px;
    width: 100%;
  }

  button {
    padding: 14px 31px;
    background-color: #9bd5b1;
    border: none;
    border-radius: 3px;

    font-size: 18px;
    color: #fff;
  }
}

.content {
  margin-top: 30px;
  display: flex;
  gap: 42px;
}

.aside {
  padding: 42px 35px 46px;
  height: fit-content;
  background-color: #d5b19b;
  border-radius: 18px;

  h3 {
    text-transform: uppercase;
  }

  input {
    margin-top: 38px;
    padding: 15px 0 15px 15px;
    width: 100%;
    border: none;
    border-radius: 20px;
    box-sizing: border-box;
  }

  button {
    margin-top: 20px;
    width: 100%;
    display: block;
    
    padding: 12px 0;
    background-color: #9bd5b1;
    border: none;
    border-radius: 20px;

    font-size: 18px;
    color: #fff;
  }
}

.card {
  margin-bottom: 42px;
  background-color: #d5b19b;
}
</style>
