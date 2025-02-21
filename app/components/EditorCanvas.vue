<script setup lang="ts">
import type { ContainerAttributes } from './ComponentContainer.vue'

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

watch(containers, () => emits('update:modelValue', containers.value), { deep: true })
</script>

<template>
  <div>
    <div class="h-full bg-white">
      <ComponentContainer
        v-for="(_, index) in modelValue"
        :key="index"
        v-model="(containers[index] as any)"
        class="absolute"
        :zoom-level="props.zoomLevel"
        :containers="containers"
        @click="$emit('click', index)"
      />
    </div>
  </div>
</template>
