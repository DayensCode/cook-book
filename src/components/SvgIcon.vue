<template>
  <svg xmlns="http://www.w3.org/2000/svg">
    <use :href="iconPath" />
  </svg>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: String,
  },
  setup(props) {
    let iconPath = computed(() => {
      return `/icon/${props.name}.svg#${props.name}`;
    });

    return {
      iconPath
    }
  }
})
</script>
