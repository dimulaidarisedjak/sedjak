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
const emits = defineEmits(['update:modelValue', 'click'])

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

const startX = ref(0)
const startY = ref(0)
const dragThreshold = 1 // Minimum movement to count as dragging

const startDrag = (event: MouseEvent) => {
  console.log(event.type)
  if (isDragging.value) return

  // Store initial position
  startX.value = event.clientX
  startY.value = event.clientY
  isDragging.value = false // Assume it's a click initially

  offsetX.value = (event.clientX / props.zoomLevel) - modelValue.value.position.x
  offsetY.value = (event.clientY / props.zoomLevel) - modelValue.value.position.y

  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('mousemove', onDrag)
}

const onDrag = (event: MouseEvent) => {
  console.log(event.type)
  const deltaX = Math.abs(event.clientX - startX.value)
  const deltaY = Math.abs(event.clientY - startY.value)

  if (!isDragging.value && (deltaX >= dragThreshold || deltaY >= dragThreshold)) {
    isDragging.value = true // Now it's a drag
    ghostPosition.value = { ...modelValue.value.position } // Initialize ghost only when dragging starts
  }

  if (!isDragging.value) return // Ignore small movements (still a click)

  let newX = (event.clientX / props.zoomLevel) - offsetX.value
  let newY = (event.clientY / props.zoomLevel) - offsetY.value

  newX = Math.round(newX / gridSize) * gridSize
  newY = Math.round(newY / gridSize) * gridSize

  // Constrain to canvas bounds:
  newX = Math.max(0, Math.min(newX, canvasSize - modelValue.value.width))
  newY = Math.max(0, Math.min(newY, canvasSize - modelValue.value.height))

  // Find a nearby non-overlapping position
  const adjustedPosition = resolveCollision(newX, newY)

  if (ghostPosition.value) {
    ghostPosition.value.x = adjustedPosition.x
    ghostPosition.value.y = adjustedPosition.y
  }
}

const stopDrag = (event: MouseEvent) => {
  console.log(event.type)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  if (!isDragging.value) {
    handleClick() // Handle click if no drag occurred
    return
  }

  if (ghostPosition.value) {
    modelValue.value.position.x = ghostPosition.value.x
    modelValue.value.position.y = ghostPosition.value.y
  }

  isDragging.value = false
  ghostPosition.value = null // Reset ghost position
}

const handleClick = () => {
  isSelected.value = !isSelected.value
  console.log('Element clicked')
  emits('click')
  // Add logic for selection, menu, etc.
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})

watch(modelValue, () => emits('update:modelValue', modelValue.value), { deep: true })
watch(isSelected, () => console.log('isSelected', isSelected.value))
// watch(isHovered, () => console.log('isHovered', isHovered.value))
watch(isDragging, () => console.log('isDragging', isDragging.value))
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
