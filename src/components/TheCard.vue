<template>
  <div class="card" @click="$emit('click')">
    <div class="description">
      <div class="description__top">
        <div class="category background">Категория: {{ category }}</div>
        <div class="sub-info">
          <div v-if="isAuthorized" class="background">
            <SvgIcon class="to-save" name="to-save" />
            222
          </div>
          <div class="background">
            <SvgIcon class="clock" name="clock" />
            <span>{{ formattedTime }}</span>
          </div>
        </div>
      </div>
      <h3>{{ title }}</h3>
      <div class="description__instruction">{{ instruction }}</div>
    </div>
    
    <img alt="фото готового блюда" src="../assets/img/card.png" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { formatTime } from '@/helpers/index';

import SvgIcon from "./SvgIcon.vue";

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);

const props = defineProps<{
  title: string
  category: string
  instruction: string
  time: number
}>()

const formattedTime = computed(() => formatTime(props.time));
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  margin-bottom: 22px;
  display: flex;
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-height: 267px;
}

.description {
  margin: 40px;
  color: #2f2222;
  flex: 1;

  &__top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .category {
    font-size: 16px;
    color: #5D71DD;
  }

  .sub-info {
    display: flex;
    gap: 8px;
    color: #837B7A;

    &>div {
      display: flex;
      align-items: center;
      gap: 8px;

      span {
        line-height: 1;
      }
    }

    .clock, .to-save {
      width: 17px;
      height: 17px;
    }
  }

  &__instruction {
    margin-top: 22px;
    color: rgba(47, 34, 34, 0.4);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.background {
  padding: 10px 16px;
  background-color: #F7F8FD;
  border-radius: 8px;
}

img {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  width: 250px;
  object-fit: cover;
}
</style>
