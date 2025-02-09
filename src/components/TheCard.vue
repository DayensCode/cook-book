<template>
  <div class="card">
    <div class="description">
      <span>Простые рецепты на каждый день</span>
      <div>
        <h3>Подборка рецептов которые сможет приготовить каждый</h3>
        <p>
          Размышляя об управлении ИТ-активами, я вспомнил один учебный пример.
          Менеджер по ИТ-мощностям в крупной компании периодически готовил
          толстенный отчёт руководству. В очередной раз он не принёс отчёт,
          решив проверить, нужен ли он вообще.
        </p>
      </div>
    </div>
    <img alt="logo" src="../assets/img/card.png" />
  </div>
</template>

<script>
export default {
  name: "TheCard",
};
</script>

<style lang="scss" scoped>
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
    color: #2f2222;

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
