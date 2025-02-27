<template>
  <div class="card" @click="openRecipe">
    <div class="description">
      <span>Простые рецепты на каждый день</span>
      <div class="error">
      <div v-if="loading">Загрузка...</div>
      <div v-if="error" >{{ error }}</div>
</div>
      <div class="content" ref="content" :class="{ expanded: isExpanded }">
        <h3>{{ title }}</h3>
        <p><strong>Ингредиенты:</strong> {{ ingredients.replace(/\|/g, ", ") }}</p>
        <p><strong>Количество порций:</strong> {{ servings }}</p>
        <p><strong>Рецепт:</strong> {{ instructions }}</p>
      </div>

      <button class="btn-light-green" v-if="isOverflowing" @click="toggleExpand">
        {{ isExpanded ? "Скрыть" : "Показать больше" }}
      </button>
    </div>
    
    <img alt="collections-card" src="../assets/img/card.png" />
  </div>
</template>

<script>
export default {
  name: "TheCard",
  props: {
    title: String,
    ingredients: String,
    servings: String,
    instructions: String
  },
  data() {
    return {
      isExpanded: false,
      isOverflowing: false 
    };
  },
  mounted() {
    this.checkOverflow(); 
  },
  methods: {
    toggleExpand(event) {
      event.stopPropagation();
      this.isExpanded = !this.isExpanded;
    },
    openRecipe() {
      this.$emit("openModal"); 
    },
    checkOverflow() {
      this.$nextTick(() => {
        if (this.$refs.content) {
          this.isOverflowing = this.$refs.content.scrollHeight > 200;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  margin-bottom: 42px;
  display: flex;
  flex-direction: row; 
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.description {
  margin: 30px 30px 10px 30px;
  color: #2f2222;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px
}

.content {
  max-height: 200px;
  overflow: hidden;
  position: relative;
  transition: max-height 0.3s ease;
}

.expanded {
  max-height: none;
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #9bd5b1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #5bb07b;
}

img {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  width: 250px;
  object-fit: cover;
}
</style>
