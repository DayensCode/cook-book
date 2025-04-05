<template>
  <div class="modal-backdrop">
    <div class="modal-container">
      <button class="modal-close" @click="handleClose">✕</button>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['close'])

const props = defineProps({
  onClose: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  }
})

const handleClose = () => {
  props.onClose()
  emit('close')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  background-color: white;
  border-radius: 2rem;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  max-width: 28rem;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #6b7280;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.modal-close:hover {
  color: #1f2937;
}
</style>
