<script lang="ts" setup>
import type { ContainerAttributes } from '~/components/CanvasObject.vue'

const model = defineModel<ContainerAttributes>({ required: true })
const isHovered = defineModel<boolean>('isHovered', { required: true })
const props = defineProps({
  zoomLevel: {
    type: Number,
    required: true,
  },
})
const emits = defineEmits(['onMouseDown'])

function onMouseDown(event: MouseEvent) {
  emits('onMouseDown', event)
}
</script>

<template>
  <div
    class="absolute border-2 border-dashed p-2 transition-all flex items-center justify-center"
    :class="{
      'border-blue-500 bg-blue-100 text-blue-500': isHovered,
      'border-green-500 bg-green-200 text-green-500': model.isSelected,
      'border-gray-500 text-gray-500': !isHovered && !model.isSelected,
    }"
    :style="{
      width: model.width + 'px',
      height: model.height + 'px',
      top: model.position.y * props.zoomLevel + 'px',
      left: model.position.x * props.zoomLevel + 'px',
      transform: `scale(${props.zoomLevel})`,
      transformOrigin: 'top left',
    }"
    @mousedown="onMouseDown"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <span
      class="absolute inset-0 flex items-center justify-center font-semibold pointer-events-none"
    >
      {{ model.name }}
      {{ model.width }} {{ model.height }}
    </span>
    <slot />
  </div>
</template>
