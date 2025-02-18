<template>
  <div class="search flex">
    <input type="text" placeholder="Например, рецепты вторых блюд ..." />
    <button>Найти</button>
  </div>
</template>
  
<script>
export default {
  name: "TheSearch",
};
</script>
  
<style lang="scss" scoped>
.search {
  margin-top: 32px;
  gap: 20px;

  input {
    padding: 14px 31px;
    width: 100%;
    background-color: #e3cbbc;
    border: 2px solid #e3cbbc;
    border-radius: 3px;
    outline: none;
    font-size: 16px;
  }

  button {
    padding: 14px 31px;
    background-color: #9bd5b1;
    border: none;
    border-radius: 3px;

    font-size: 18px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #8ec6a3;
    }
  }
}
</style>
