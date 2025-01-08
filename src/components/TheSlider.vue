<template>
  <Carousel :items-to-show="3" :wrap-around="true">
    <Slide v-for="slide in 10" :key="slide">
      <div class="slide">
        <h3>Сырники из творога</h3>
        <p class="description">Размышляя об управлении ИТ-активами, я вспомнил один учебный пример. Менеджер по ИТ-мощностям в крупной компании периодически готовил толстенный отчёт руководству. В очередной раз он не принёс отчёт, решив проверить.</p>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel'

export default defineComponent({
  name: 'TheSlider',
  components: {
    Carousel,
    Slide,
    Navigation
  },
  setup() {

    return {
      // carouselConfig
    }
  }
})
</script>

<style lang="scss" scoped>
.slide {
  background-image: url('../assets/img/slide-bg.png');
  padding: 60px 42px;
  text-align: left;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(47, 34, 34, 0.65);
  }

  h3 {
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
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
  color: white;

  &:hover {
    color: #e3cbbc;
  }
}
</style>
