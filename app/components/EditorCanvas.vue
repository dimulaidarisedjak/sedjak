<script setup lang="ts">
import type { ContainerAttributes } from './Container/CanvasObject.vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<ContainerAttributes[]>,
    required: true,
  },
  zoomLevel: {
    type: Number,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue', 'click'])

const containers = ref(props.modelValue)

watch(containers, () => {
  emits('update:modelValue', containers.value)
}, { deep: true },
)
</script>

<template>
  <div>
    <div class="h-full bg-white">
      <ContainerCanvasObject
        v-for="(_, index) in modelValue"
        :key="index"
        v-model="(containers[index] as ContainerAttributes)"
        class="absolute"
        :zoom-level="props.zoomLevel"
        :containers="containers"
        @click:single="$emit('click', { type: 'single', index })"
        @click:multiple="$emit('click', { type: 'multiple', index })"
      />
    </div>
  </div>
</template>
