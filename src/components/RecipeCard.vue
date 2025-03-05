<template>
  <div class="recipe-card">
    <div class="image-container">
      <img alt="recipe-card" src="../assets/img/recipe-card.png" />
      <div class="overlay">
        <div class="time">1ч 17м</div>
        <div class="ingredients">
          <p>ингредиенты:</p>
          <ul>
            <li>огурцы</li>
            <li>болгарский перец</li>
            <li>салат айсберг</li>
            <li>зеленый лук</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="description flex">
      <h3>Постный салат</h3>
      <SvgIcon :class="isLiked" :name="isLiked" @click="toggleLike" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

export default defineComponent({
  name: "RecipeCard",
  components: { SvgIcon },
  setup() {
    const isLiked = ref<"like" | "like-fill">("like");
    const toggleLike = () => {
      isLiked.value = isLiked.value === "like" ? "like-fill" : "like";
    };

    return {
      isLiked,
      toggleLike
    };
  },
})
</script>

<style lang="scss" scoped>
.recipe-card {
  background-color: #e3cbbc;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  .image-container {
    position: relative;

    img {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    padding: 19px;
    box-sizing: border-box;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    width: 100%;
    height: 100%;
    background: rgba(47, 34, 34, 0.65);
    opacity: 0;
    color: #fff;
    transition: opacity 0.3s ease-in-out;

    .time {
      text-align: end;
      font-size: 16px;
      margin-bottom: 30px;
    }

    .ingredients {
      p {
        text-transform: uppercase;
      }

      li::marker {
        content:('- ')
      }
    }
  }

  &:hover .overlay {
    opacity: 1;
  }

  .description {
    padding: 15px 20px 20px;
    justify-content: space-between;
  }
}

.like,
.like-fill {
  width: 18px;
  height: 16px;
}
</style>
