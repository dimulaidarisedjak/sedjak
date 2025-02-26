<script lang="ts" setup>
import { useContainerDrag } from '~/composables/useContainerDrag'

export interface ContainerAttributes {
  [key: string]: boolean | number | string | { x: number, y: number }
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
const canvasRef = defineModel<HTMLElement>('canvasRef', { required: true })

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

const { startDrag, ghostPosition } = useContainerDrag(props, emits, canvasRef)
const isHovered = ref(false)

function onDrop() {
  model.value.component = selectedComponent.value
  selectedComponent.value = ''
}
</script>

<template>
  <div>
    <ContainerCanvasObject
      v-if="model.component === ''"
      v-model="model"
      v-model:is-hovered="isHovered"
      :zoom-level="props.zoomLevel"
      @on-mouse-down="startDrag"
      @dragover.prevent
      @drop="onDrop"
    />
    <ComponentCustomCard
      v-if="model.component === 'card'"
      v-model="model"
      v-model:is-hovered="isHovered"
      :class="{ 'bg-blue-100': isHovered }"
      :zoom-level="props.zoomLevel"
      @on-mouse-down="startDrag"
      @dragover.prevent
      @drop="onDrop"
    >
      <template #title>
        Card
      </template>
      <template #content>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quae dolores voluptate quibusdam fugit? Consequuntur
          voluptatum, quae dolores voluptate quibusdam fugit?
        </p>
      </template>
    </ComponentCustomCard>
    <ComponentCustomText
      v-if="model.component === 'text'"
      v-model="model"
      v-model:is-hovered="isHovered"
      :class="{ 'bg-blue-100': isHovered }"
      :zoom-level="props.zoomLevel"
      @on-mouse-down="startDrag"
      @dragover.prevent
      @drop="onDrop"
    >
      <p>Maklo Gaming</p>
    </ComponentCustomText>
    <ComponentCustomImage
      v-if="model.component === 'image'"
      v-model="model"
      v-model:is-hovered="isHovered"
      :class="{ 'bg-blue-100': isHovered }"
      :zoom-level="props.zoomLevel"
      @on-mouse-down="startDrag"
      @dragover.prevent
      @drop="onDrop"
    >
      <p>Maklo Gaming</p>
    </ComponentCustomImage>
    <ComponentCustomButton
      v-if="model.component === 'button'"
      v-model="model"
      v-model:is-hovered="isHovered"
      :class="{ 'bg-blue-100': isHovered }"
      :zoom-level="props.zoomLevel"
      @on-mouse-down="startDrag"
      @dragover.prevent
      @drop="onDrop"
    />
    <ComponentCustomDivider
      v-if="model.component === 'divider'"
      v-model="model"
      v-model:is-hovered="isHovered"
      :class="{ 'bg-blue-100': isHovered }"
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
    >
      <span class="absolute inset-0 flex items-center justify-center font-semibold pointer-events-none">
        {{ model.name }}
      </span>
    </div>
  </div>
</template>
