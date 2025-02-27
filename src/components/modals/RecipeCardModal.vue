<template>
    <div v-if="recipe" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ recipe.title }}</h2>
        <p><strong>Ингредиенты:</strong> {{ recipe.ingredients.replace(/\|/g, ", ") }}</p>
        <p><strong>Порции:</strong> {{ recipe.servings }}</p>
        <p><strong>Инструкция:</strong> {{ recipe.instructions }}</p>
  
        <button class="btn-light-green" @click="closeModal">Закрыть</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RecipeCardModal",
    props: {
      recipe: Object
    },
    methods: {
      closeModal() {
        this.$emit("close"); 
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #e3cbbc;
    padding: 20px;
    border-radius: 10px;
    border: 1rem white solid;
    width: 50%;
    max-width: 500px;
    text-align: left;
  }
  
  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #9bd5b1;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #5bb07b;
  }
  </style>
  