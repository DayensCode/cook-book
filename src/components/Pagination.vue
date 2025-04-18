<template>
  <div class="pagination-container">
    <SvgIcon class="left-pagination-arrow" name="left-pagination-arrow" @click="goBack" />

    <div class="page-buttons">
      <button v-for="page in visiblePages" :key="page" @click="selectPage(page)" :class="['page', { active: page === currentPage }]">
        {{ page }}
      </button>
    </div>

    <SvgIcon class="right-pagination-arrow" name="right-pagination-arrow" @click="goForward" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue';
import SvgIcon from './SvgIcon.vue';

const props = defineProps<{
  totalPages: number;
  modelValue: number;
  onNext?: () => void;
  onPrev?: () => void;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const currentPage = computed(() => props.modelValue);

const goBack = () => {
  if (currentPage.value > 1) {
    emit('update:modelValue', currentPage.value - 1);
    props.onPrev?.();
  }
};

const goForward = () => {
  if (currentPage.value < props.totalPages) {
    emit('update:modelValue', currentPage.value + 1);
    props.onNext?.();
  }
};

const selectPage = (page: number) => {
  emit('update:modelValue', page);
};

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 1);
  const end = Math.min(props.totalPages, start + 3);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px 38px;
  width: fit-content;
  margin-left: auto;
  margin-right: 0;
}

.page-buttons {
  display: flex;
  gap: 1rem;
}

.page {
  color: #e3cbbc;
  font-size: 24px;
  border: none;
  background-color: transparent;
  font-weight: 600;
  transition: all .3s linear;
}

.page.active {
  color: #837B7A;
}

.page:not(:disabled):hover,
.arrow:not(.disabled):hover {
  color: #837B7A;
  cursor: pointer;
}

.page.active:hover {
  color: #837B7A;
  cursor: default;
}

.right-pagination-arrow,
.left-pagination-arrow {
  display: block;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>
