<script setup lang="ts">
import type { ContainerAttributes } from './CanvasObject.vue'
import CanvasObject from './CanvasObject.vue'

const model = defineModel<ContainerAttributes[]>({ required: true })
const selectedComponent = defineModel<string>('selectedComponent', {
  required: true,
})
const props = defineProps({
  zoomLevel: {
    type: Number,
    required: true,
  },
})
const emits = defineEmits(['click'])
</script>

<template>
  <div>
    <div class="h-full bg-white">
      <CanvasObject
        v-for="(_, index) in model"
        :key="index"
        v-model="(model[index] as ContainerAttributes)"
        v-model:selected-component="selectedComponent"
        class="absolute"
        :zoom-level="props.zoomLevel"
        :containers="model"
        @click:single="emits('click', { type: 'single', index })"
        @click:multiple="emits('click', { type: 'multiple', index })"
        @dragover.prevent
      />
    </div>
  </div>
</template>
