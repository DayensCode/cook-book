<template>
  <Carousel :items-to-show="3.2" :wrap-around="true" :gap="3">
    <Slide v-for="slide in slides" :key="slide.id">
      <div class="slide">
        <h3>{{ slide.title }}</h3>
        <p class="description">{{ slide.description }}</p>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { SlideItem, ISlideItem } from "@/const/slides";

const slides = ref<ISlideItem[]>(SlideItem);
</script>

<style lang="scss" scoped>
.slide {
  background-image: url("../assets/img/slide-bg.png");
  background-size: cover;
  padding: 60px;
  text-align: left;
  border-radius: 0 0 8px 8px;
  position: relative;

  &::before {
    content: "";
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
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .description {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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
