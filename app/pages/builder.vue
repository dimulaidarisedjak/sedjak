<script lang="ts" setup>
import { useResize } from '~~/shared/utils/functions'

const { width: leftWidth, startResize: startLeftResize } = useResize()
const { width: rightWidth, startResize: startRightResize } = useResize(100, 400, true)
const zoomLevel = ref(1) // Initial zoom level
const minZoom = 0.5 // Minimum zoom level
const maxZoom = 2 // Maximum zoom level
const zoomStep = 0.1 // Zoom increment step

const nodes = ref([{
  key: '0',
  label: 'Pages',
  data: 'Documents Folder',
  children: [
    {
      key: '0-0',
      label: 'Page 1',
      data: 'Work Folder',
    },
    {
      key: '0-1',
      label: 'Page 2',
      data: 'Home Folder',
    },
  ],
}])

const canvasSize = ref({ width: 2000, height: 2000 })
const isCanvasFocused = ref(false) // Track if the canvas is focused

// Function to update zoom level
const updateZoom = (delta) => {
  const newZoom = zoomLevel.value + delta
  zoomLevel.value = Math.min(maxZoom, Math.max(minZoom, newZoom))

  // Adjust the canvas size dynamically
  canvasSize.value.width = 2000 * zoomLevel.value
  canvasSize.value.height = 2000 * zoomLevel.value
}

// Handle zoom via mouse wheel
const handleWheelZoom = (event) => {
  if (event.ctrlKey) {
    event.preventDefault()
    event.stopPropagation() // Prevents browser zoom
    updateZoom(event.deltaY < 0 ? zoomStep : -zoomStep)
  }
}

// Handle zoom via keyboard (Fix for Ctrl + +/-)
const handleKeyZoom = (event) => {
  if (event.ctrlKey) {
    if (event.code === 'Equal' || event.code === 'NumpadAdd') {
      updateZoom(zoomStep)
    }
    else if (event.code === 'Minus' || event.code === 'NumpadSubtract') {
      updateZoom(-zoomStep)
    }
    else if (event.code === 'Digit0' || event.code === 'Numpad0') {
      zoomLevel.value = 1
      canvasSize.value = { width: 2000, height: 2000 }
    }
    event.preventDefault()
    event.stopPropagation() // Prevent browser zoom
  }
}

// Prevent browser zoom globally
const preventBrowserZoom = (event) => {
  if (event.ctrlKey && ['Equal', 'Minus', 'Digit0', 'NumpadAdd', 'NumpadSubtract', 'Numpad0'].includes(event.code)) {
    event.preventDefault()
  }
}

// Track canvas focus
const setCanvasFocus = (state) => {
  isCanvasFocused.value = state
}

// Attach event listeners
onMounted(() => {
  document.addEventListener('wheel', handleWheelZoom, { passive: false })
  document.addEventListener('keydown', handleKeyZoom)
  document.addEventListener('keydown', preventBrowserZoom)
})

// Cleanup event listeners
onUnmounted(() => {
  document.removeEventListener('wheel', handleWheelZoom)
  document.removeEventListener('keydown', handleKeyZoom)
  document.removeEventListener('keydown', preventBrowserZoom)
})
</script>

<template>
  <div class="flex h-screen w-screen">
    <!-- Left Content (Vertical Scroll Only) -->
    <div
      id="left-content"
      class="bg-red-500 relative overflow-y-auto"
      :style="{ width: leftWidth + 'px', height: '100vh' }"
    >
      <LeftMenu v-model="nodes" />
      <div
        class="w-[2px] bg-gray-500 cursor-col-resize absolute right-0 top-0 bottom-0"
        @mousedown="startLeftResize"
      />
    </div>

    <!-- Canvas (2D Scroll + Zoom) -->
    <div
      id="canvas"
      class="bg-white flex-1 overflow-auto"
      @mouseenter="setCanvasFocus(true)"
      @mouseleave="setCanvasFocus(false)"
    >
      <div
        class="p-4"
        :style="{
          width: canvasSize.width + 'px',
          height: canvasSize.height + 'px',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left',
        }"
      >
        <p>Canvas Content (Zoom: {{ zoomLevel.toFixed(1) }}x)</p>
        <div class="h-80 bg-green-500" />
        <div class="h-80 bg-amber-500" />
        <div class="h-80 bg-green-500" />
      </div>
    </div>

    <!-- Right Content (Vertical Scroll Only) -->
    <div
      id="right-content"
      class="bg-blue-500 relative overflow-y-auto"
      :style="{ width: rightWidth + 'px', height: '100vh' }"
    >
      <p>Right Menu</p>
      <div
        class="w-1 bg-gray-500 cursor-col-resize absolute left-0 top-0 bottom-0"
        @mousedown="startRightResize"
      />
    </div>
  </div>
</template>
