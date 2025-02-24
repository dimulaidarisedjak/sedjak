<script lang="ts" setup>
import { useContainerDrag } from '~/composables/useContainerDrag'

export interface ContainerAttributes {
  name: string
  width: number
  height: number
  position: { x: number, y: number }
  isSelected: boolean
  component: string
}

const model = defineModel<ContainerAttributes>({ required: true })
const selectedComponent = defineModel<string>('selectedComponent', {
  required: true,
})
const props = defineProps({
  zoomLevel: {
    type: Number,
    required: true,
  },
  containers: {
    type: Array as PropType<ContainerAttributes[]>,
    required: true,
  },
})
const emits = defineEmits([
  'update:isSelected',
  'click:single',
  'click:multiple',
])

console.log('selectedComponent', selectedComponent.value)
const { startDrag, ghostPosition } = useContainerDrag(props, emits)
const isHovered = ref(false)

function onDrop() {
  model.value.component = selectedComponent.value
  selectedComponent.value = ''
}
</script>

<template>
  <div>
    <ContainerCanvasObject
      v-model="model"
      v-model:is-hovered="isHovered"
      :zoom-level="props.zoomLevel"
      @on-mouse-down="startDrag"
      @dragover.prevent
      @drop="onDrop"
    />

    <!-- Ghost element -->
    <div
      v-if="ghostPosition"
      class="absolute border-2 border-dashed bg-gray-300 opacity-50 cursor-move"
      :style="{
        width: model.width * props.zoomLevel + 'px',
        height: model.height * props.zoomLevel + 'px',
        top: ghostPosition.y * props.zoomLevel + 'px',
        left: ghostPosition.x * props.zoomLevel + 'px',
      }"
    />
  </div>
</template>
