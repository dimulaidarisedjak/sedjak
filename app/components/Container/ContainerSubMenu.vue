<script lang="ts" setup>
import type { ContainerAttributes } from '@/components/ComponentContainer.vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<ContainerAttributes>,
    required: true,
  },
})
// const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <p>{{ props.modelValue }}</p>
  </div>
</template>
