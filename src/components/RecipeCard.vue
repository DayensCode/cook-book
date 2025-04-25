<template>
  <div class="recipe-card">
    <div class="image-container">
      <div class="image"></div>
      <div class="overlay">
        <div class="time">{{ formattedTime }}</div>
        <div class="ingredients">
          <p>ингредиенты:</p>
          <ul>
            <li v-for="(item, index) in ingredients" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="description flex">
      <div class="description__title flex">
        <h3>{{ props.title }}</h3>
        <SvgIcon class="edit" name="edit" />
      </div>
      <SvgIcon class="delete" name="delete" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { formatTime } from '@/helpers/index';

import SvgIcon from "@/components/SvgIcon.vue";

export default defineComponent({
  name: "RecipeCard",
  components: { SvgIcon },
  props: {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const formattedTime = computed(() => formatTime(props.time));

    const ingredients = computed(() => {
      const match = props.instruction.match(/^Ингредиенты:\s*(.+?)\./i);
      if (!match) return [];

      return match[1]
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
    });

    return {
      formattedTime,
      ingredients,
      props
    };
  },
})
</script>

<style lang="scss" scoped>
.recipe-card {
  margin-bottom: 30px;
  background-color: #e3cbbc;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  height: 300px;

  .image-container {
    position: relative;
    cursor: pointer;

    .image {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      height: 240px;
      background-image: url("@/assets/img/recipe-card.png");
      background-size: cover;
    }

    &:hover .overlay {
      opacity: 1;
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

  .description {
    padding: 15px 20px 20px;
    justify-content: space-between;

    .description__title {
      justify-content: flex-start;
    }

    h3 {
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      width: 80%;
    }
  }
}

.delete,
.edit {
  margin-left: 8px;
  width: 19px;
  height: 19px;
  cursor: pointer;
}
</style>
