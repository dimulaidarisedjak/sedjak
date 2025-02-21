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
  containers: {
    type: Array as PropType<ContainerAttributes[]>,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)
const containers = ref(props.containers)
const isDragging = ref(false)
const isHovered = ref(false)
const isSelected = ref(false)
const ghostPosition = ref<{ x: number, y: number } | null>(null)
const offsetX = ref(0)
const offsetY = ref(0)

const gridSize = 20 // Snap grid size
const canvasSize = 4000

// Checks if the given (x, y) would cause an overlap with any other container.
const checkCollision = (x: number, y: number) => {
  const newLeft = x
  const newTop = y
  const newRight = x + modelValue.value.width
  const newBottom = y + modelValue.value.height

  return containers.value.some((container) => {
    // Skip self. (You might consider using a unique id instead of reference comparison)
    if (container === modelValue.value) return false

    const cLeft = container.position.x
    const cTop = container.position.y
    const cRight = container.position.x + container.width
    const cBottom = container.position.y + container.height

    // Return true if there is any overlap
    return !(newRight <= cLeft || newLeft >= cRight || newBottom <= cTop || newTop >= cBottom)
  })
}

// Uses a spiral search from the target (x,y) to find the nearest non-overlapping position.
const resolveCollision = (x: number, y: number) => {
  const maxDistance = 200 // maximum search range (in pixels)
  for (let d = 0; d <= maxDistance; d += gridSize) {
    // Try offsets in a square around (x, y)
    for (let dx = -d; dx <= d; dx += gridSize) {
      for (let dy = -d; dy <= d; dy += gridSize) {
        let testX = x + dx
        let testY = y + dy

        // Keep the test position within the canvas bounds
        testX = Math.max(0, Math.min(testX, canvasSize - modelValue.value.width))
        testY = Math.max(0, Math.min(testY, canvasSize - modelValue.value.height))

        if (!checkCollision(testX, testY)) {
          return { x: testX, y: testY }
        }
      }
    }
  }
  // If no free spot is found, return the original position (or the last valid one)
  return { x, y }
}

const startDrag = (event: MouseEvent) => {
  if (isDragging.value) return
  isDragging.value = true
  offsetX.value = (event.clientX / props.zoomLevel) - modelValue.value.position.x
  offsetY.value = (event.clientY / props.zoomLevel) - modelValue.value.position.y
  ghostPosition.value = { ...modelValue.value.position }
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value || !ghostPosition.value) return

  let newX = (event.clientX / props.zoomLevel) - offsetX.value
  let newY = (event.clientY / props.zoomLevel) - offsetY.value

  newX = Math.round(newX / gridSize) * gridSize
  newY = Math.round(newY / gridSize) * gridSize

  // Constrain to canvas bounds:
  newX = Math.max(0, Math.min(newX, canvasSize - modelValue.value.width))
  newY = Math.max(0, Math.min(newY, canvasSize - modelValue.value.height))

  // Find a nearby non-overlapping position
  const adjustedPosition = resolveCollision(newX, newY)
  ghostPosition.value.x = adjustedPosition.x
  ghostPosition.value.y = adjustedPosition.y
}

const stopDrag = () => {
  if (ghostPosition.value) {
    modelValue.value.position.x = ghostPosition.value.x
    modelValue.value.position.y = ghostPosition.value.y
  }
  isDragging.value = false
  ghostPosition.value = null

  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})

watch(modelValue, () => emits('update:modelValue', modelValue.value), { deep: true })
</script>

<template>
  <div>
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
      class="absolute border-2 border-dashed bg-gray-300 opacity-50 cursor-move"
      :style="{
        width: modelValue.width * props.zoomLevel + 'px',
        height: modelValue.height * props.zoomLevel + 'px',
        top: ghostPosition.y * props.zoomLevel + 'px',
        left: ghostPosition.x * props.zoomLevel + 'px',
      }"
    />
  </div>
</template>
