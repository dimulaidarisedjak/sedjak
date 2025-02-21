<script lang="ts" setup>
import type { PropType } from 'vue'

export interface ContainerAttributes {
  width: number
  height: number
  position: { x: number, y: number }
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<ContainerAttributes>,
    required: true,
  },
  zoomLevel: {
    type: Number,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)
const isDragging = ref(false)
const isHovered = ref(false)
const isSelected = ref(false)
const ghostPosition = ref<{ x: number, y: number } | null>(null)
const offsetX = ref(0)
const offsetY = ref(0)

const gridSize = 20 // Snap grid size

const startDrag = (event: MouseEvent) => {
  isDragging.value = true

  // Calculate offset between cursor and the object position
  offsetX.value = (event.clientX / props.zoomLevel) - modelValue.value.position.x
  offsetY.value = (event.clientY / props.zoomLevel) - modelValue.value.position.y

  // Initialize ghost at correct position
  ghostPosition.value = { ...modelValue.value.position }

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value || !ghostPosition.value) return

  // Compute new position, adjusting for initial offset
  let newX = (event.clientX / props.zoomLevel) - offsetX.value
  let newY = (event.clientY / props.zoomLevel) - offsetY.value

  // Snap to grid
  newX = Math.round(newX / gridSize) * gridSize
  newY = Math.round(newY / gridSize) * gridSize

  // Constrain within canvas size (4000)
  const canvasSize = 4000
  newX = Math.max(0, Math.min(newX, canvasSize - modelValue.value.width))
  newY = Math.max(0, Math.min(newY, canvasSize - modelValue.value.height))

  ghostPosition.value.x = newX
  ghostPosition.value.y = newY
}

const stopDrag = () => {
  if (ghostPosition.value) {
    // Apply ghost position to actual container
    modelValue.value.position.x = ghostPosition.value.x
    modelValue.value.position.y = ghostPosition.value.y
  }

  isDragging.value = false
  ghostPosition.value = null

  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

watch(modelValue, () => emits('update:modelValue', modelValue.value), { deep: true })
</script>

<template>
  <div class="relative">
    <!-- Actual container -->
    <div
      class="absolute border-2 border-dashed p-2 transition-all"
      :class="{
        'border-blue-500 bg-blue-100': isHovered,
        'border-green-500 bg-green-200': isSelected,
      }"
      :style="{
        width: modelValue.width * props.zoomLevel + 'px',
        height: modelValue.height * props.zoomLevel + 'px',
        top: modelValue.position.y * props.zoomLevel + 'px',
        left: modelValue.position.x * props.zoomLevel + 'px',
      }"
      @mousedown="startDrag"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @click="() => { isSelected = !isSelected; console.log('Something') }"
    >
      <slot />
    </div>

    <!-- Ghost element -->
    <div
      v-if="ghostPosition"
      class="absolute border-2 border-dashed bg-gray-300 opacity-50 pointer-events-none"
      :style="{
        width: modelValue.width * props.zoomLevel + 'px',
        height: modelValue.height * props.zoomLevel + 'px',
        top: ghostPosition.y * props.zoomLevel + 'px',
        left: ghostPosition.x * props.zoomLevel + 'px',
      }"
    />
  </div>
</template>
