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
        <div class="card">
          <div class="description">
            <span>Простые рецепты на каждый день</span>
            <div>
              <h3>Подборка рецептов которые сможет приготовить каждый</h3>
              <p>Размышляя об управлении ИТ-активами, я вспомнил один учебный пример. Менеджер по ИТ-мощностям в крупной компании периодически готовил толстенный отчёт руководству. В очередной раз он не принёс отчёт, решив проверить, нужен ли он вообще.</p>
            </div>
          </div>
          <img alt="logo" src="../assets/img/card.png">
        </div>


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
  padding: 45px 35px 48px;
  height: fit-content;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-image: url("../assets/img/aside.png");
  background-size: cover;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(213, 177, 155, 0.65);
    border-radius: 18px;
  }

  h3 {
    text-transform: uppercase;
    white-space: nowrap;
    position: relative;
    z-index: 2;
  }

  input {
    margin-top: 38px;
    padding: 15px 0 15px 15px;
    width: 100%;
    border: none;
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
  }

  button {
    margin-top: 21px;
    width: 100%;
    display: block;
    
    padding: 14px 0;
    background-color: #9bd5b1;
    border: none;
    border-radius: 20px;

    font-size: 18px;
    color: #fff;
    position: relative;
    z-index: 2;
    cursor: pointer;
  }
}

.card {
  margin-bottom: 42px;
  display: flex;
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .description {
    margin: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #2F2222;

    span {
      padding: 9px 17px;
      display: inline-block;
      align-self: flex-start;
      text-align: center;
      border-radius: 8px;
      background-color: #f7f8fd;
      color: #5d71dd;
      font-size: 16px;
    }

    h3 {
      font-size: 24px;
      margin-bottom: 22px;
    }
  }

  img {
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
  }
}
</style>
