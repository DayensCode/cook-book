<template>
    <label>{{ label }}</label>
    <el-input
      v-bind="$attrs"
      v-model="inputValue"
      class="input-container"
      :show-password="type==='password'"
      :type="type"
      :clearable="clearable"
      :placeholder="placeholder"
    />
  
</template>

<script>

export default {
  props: {
    modelValue: String,
    label: String,
    type: { type: String, default: 'text' },
    placeholder: String,
    clearable: { type: Boolean, default: true },
    required: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: black;
}

.password-container {
  display: flex;
  align-items: center;
  position: relative;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  font-size: 1.2rem;
}

.input-container {
  width: 100%;
}
</style>
