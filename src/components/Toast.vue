<template>
  <div class="toast" :class="type" v-if="visible">
    <SvgIcon v-if="type === 'info'" class="success" name="success" />
    <SvgIcon v-else class="reject" name="reject" />
    <div class="title">{{ title }}</div>
    <button class="close" @click="handleClose">×</button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import SvgIcon from './SvgIcon.vue';

interface Props {
  title: string;
  type: 'info' | 'error';
  onClose?: () => void;
}

const props = defineProps<Props>();
const visible = ref(true);

const handleClose = () => {
  visible.value = false;
  if (props.onClose) {
    props.onClose();
  }
};

onMounted(() => {
  setTimeout(handleClose, 5000);
});
</script>

<style scoped>
.toast {
  position: absolute;
  z-index: 999;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  max-width: 500px;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #f1f5f9;
  font-size: 1.1rem;
  margin: 1rem;
  transition: opacity 0.3s ease;
}
.toast.info {
  background-color: #83c9a8; /* green */
}
.toast.error {
  background-color: #ef5b25; /* red */
}

.reject,
.success {
  display: block;
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 0 15px;
}

.title {
  flex: 1;
}
.close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
}
</style>
