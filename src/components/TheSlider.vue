<template>
  <Carousel :items-to-show="3.2" :wrap-around="true" :gap="3">
    <Slide v-for="slide in 10" :key="slide">
      <div class="slide">
        <div class="like-container" @click="toggleLike">
          <SvgIcon :class="isLiked" :name="isLiked" />
        </div>
        <h3>Сырники из творога</h3>
        <p class="description">Сырники классические — одно из самых простых блюд, с которых многие начинают знакомство с кулинарией. Это настоящая классика жанра, которая удается всем и всегда!</p>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import SvgIcon from './SvgIcon.vue'

export default defineComponent({
  name: 'TheSlider',
  components: {
    Carousel,
    Slide,
    Navigation,
    SvgIcon
  },
  setup() {
    const isLiked = ref('like')
    const toggleLike = () => {
      isLiked.value = isLiked.value === 'like' ? 'like-fill' : 'like'
    }

    return {
      isLiked,
      toggleLike
    }
  }
})
</script>

<style lang="scss" scoped>
.slide {
  background-image: url('../assets/img/slide-bg.png');
  background-size: cover;
  padding: 60px;
  text-align: left;
  border-radius: 0 0 8px 8px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(47, 34, 34, 0.65);
    border-radius: 0 0 8px 8px;
  }

  h3 {
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }

  .like-container {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    cursor: pointer;

    .like,
    .like-fill {
      width: 16px;
      height: 16px;
    }
  }

  .description {
    position: relative;
    z-index: 1;
  }
}
</style>

<style lang="scss">
.carousel__prev, 
.carousel__next {
  color: #fff !important;

  &:hover {
    color: #e3cbbc !important;
  }
}
</style>
