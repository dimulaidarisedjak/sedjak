<script lang="ts" setup>
import { useResize } from '~~/shared/utils/functions'

const { width: leftWidth, startResize: startLeftResize } = useResize()
const { width: rightWidth, startResize: startRightResize } = useResize(100, 400, true)
const zoomLevel = ref(1) // Initial zoom level
const minZoom = 0.5 // Minimum zoom level
const maxZoom = 2 // Maximum zoom level
const zoomStep = 0.04 // Zoom increment step

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

const canvasRef = ref<any>(null)
const contentRef = ref(null)

// Zoom function (Cursor-centered)
const updateZoom = (delta: any, event: any = null) => {
  const newZoom = Math.min(maxZoom, Math.max(minZoom, zoomLevel.value + delta))
  if (newZoom === zoomLevel.value) return // Prevent redundant updates

  if (event && canvasRef.value && contentRef.value) {
    const rect = canvasRef.value.getBoundingClientRect()
    const offsetX = event.clientX - rect.left + canvasRef.value.scrollLeft
    const offsetY = event.clientY - rect.top + canvasRef.value.scrollTop

    const scaleFactor = newZoom / zoomLevel.value

    requestAnimationFrame(() => {
      canvasRef.value.scrollLeft = offsetX * scaleFactor - event.clientX + rect.left
      canvasRef.value.scrollTop = offsetY * scaleFactor - event.clientY + rect.top
    })

    zoomLevel.value = newZoom
  }
  else {
    zoomLevel.value = newZoom
  }
}

// Mouse wheel zoom (cursor-centered)
const handleWheelZoom = (event: any) => {
  if (event.ctrlKey) {
    event.preventDefault()
    updateZoom(event.deltaY < 0 ? zoomStep : -zoomStep, event)
  }
}

// Keyboard zoom (centered)
const handleKeyZoom = (event: any) => {
  if (event.ctrlKey) {
    if (event.code === 'Equal' || event.code === 'NumpadAdd') {
      updateZoom(zoomStep)
    }
    else if (event.code === 'Minus' || event.code === 'NumpadSubtract') {
      updateZoom(-zoomStep)
    }
    else if (event.code === 'Digit0' || event.code === 'Numpad0') {
      zoomLevel.value = 1
    }
    event.preventDefault()
    event.stopPropagation()
  }
}

// Prevent browser zoom
const preventBrowserZoom = (event: any) => {
  if (event.ctrlKey && ['Equal', 'Minus', 'Digit0', 'NumpadAdd', 'NumpadSubtract', 'Numpad0'].includes(event.code)) {
    event.preventDefault()
  }
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

    <!-- Canvas (2D Scroll + Cursor-Centered Zoom) -->
    <div
      id="canvas"
      ref="canvasRef"
      class="bg-white flex-1 overflow-auto"
    >
      <div
        ref="contentRef"
        class="p-4"
        :style="{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top left',
          width: '2000px',
          height: '2000px',
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
