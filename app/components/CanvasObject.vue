<script lang="ts" setup>
import { useContainerDrag } from '~/composables/useContainerDrag'
import { useResize } from '~/composables/useResize'

export interface ContainerAttributes {
  [key: string]: boolean | number | string | { x: number, y: number } | any
  name: string
  width: number
  height: number
  position: { x: number, y: number }
  isSelected: boolean
  component: string
  properties: any
}

const model = defineModel<ContainerAttributes>({ required: true })
const selectedComponent = defineModel<string>('selectedComponent', {
  required: true,
})
const canvasRef = defineModel<HTMLElement>('canvasRef', { required: true })
const contentRef = defineModel<HTMLElement>('contentRef', { required: true })

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
const { startResize, ghostDimensions } = useResize(props, emits, contentRef)
const isHovered = ref(false)

function onDrop() {
  model.value.component = selectedComponent.value
  if (model.value.component === 'text') {
    model.value.properties = {
      text: '',
      color: '000000',
      size: 12,
    }
  } else if (model.value.component === 'image') {
    model.value.properties = {
      src: '',
    }
  }
  selectedComponent.value = ''
}
</script>

<template>
  <div>
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
        <p :style="{ color: '#' + model.properties.color, fontSize: `${model.properties.size}px` }">
          {{ model.properties.text }}
        </p>
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

      <div v-if="model.isSelected">
        <!-- Top Left -->
        <div
          class="absolute bg-gray-700 w-[10px] h-[10px] cursor-nwse-resize"
          :style="{ top: `${model.position.y * props.zoomLevel}px`, left: `${model.position.x * props.zoomLevel}px`, transform: `scale(${props.zoomLevel})`, transformOrigin: 'top left' }"
          @mousedown="startResize($event, 'top-left')"
        />
        <!-- Top Right -->
        <div
          class="absolute bg-gray-700 w-[10px] h-[10px] cursor-nesw-resize"
          :style="{ top: `${(model.position.y + model.height - 10) * props.zoomLevel}px`, left: `${model.position.x * props.zoomLevel}px`, transform: `scale(${props.zoomLevel})`, transformOrigin: 'top left' }"
          @mousedown="startResize($event, 'top-right')"
        />
        <!-- Bottom Left -->
        <div
          class="absolute bg-gray-700 w-[10px] h-[10px] cursor-nesw-resize"
          :style="{ top: `${model.position.y * props.zoomLevel}px`, left: `${(model.position.x + model.width - 10) * props.zoomLevel}px`, transform: `scale(${props.zoomLevel})`, transformOrigin: 'top left' }"
          @mousedown="startResize($event, 'bottom-left')"
        />
        <!-- Bottom Right -->
        <div
          class="absolute bg-gray-700 w-[10px] h-[10px] cursor-nwse-resize"
          :style="{ top: `${(model.position.y + model.height - 10) * props.zoomLevel}px`, left: `${(model.position.x + model.width - 10) * props.zoomLevel}px`, transform: `scale(${props.zoomLevel})`, transformOrigin: 'top left' }"
          @mousedown="startResize($event, 'bottom-right')"
        />

        <!-- Left -->
        <div
          class="absolute bg-gray-700 w-[10px] h-[10px] cursor-ew-resize"
          :style="{ top: `${(model.position.y + (model.height - 10) / 2) * props.zoomLevel}px`, left: `${model.position.x * props.zoomLevel}px`, transform: `scale(${props.zoomLevel})`, transformOrigin: 'top left' }"
          @mousedown="startResize($event, 'left')"
        />
        <!-- Right -->
        <div
          class="absolute bg-gray-700 w-[10px] h-[10px] cursor-ew-resize"
          :style="{ top: `${(model.position.y + (model.height - 10) / 2) * props.zoomLevel}px`, left: `${(model.position.x + model.width - 10) * props.zoomLevel}px`, transform: `scale(${props.zoomLevel})`, transformOrigin: 'top left' }"
          @mousedown="startResize($event, 'right')"
        />
        <!-- Top -->
        <div
          class="absolute bg-gray-700 w-[10px] h-[10px] cursor-ns-resize"
          :style="{ top: `${model.position.y * props.zoomLevel}px`, left: `${(model.position.x + (model.width - 10) / 2) * props.zoomLevel}px`, transform: `scale(${props.zoomLevel})`, transformOrigin: 'top left' }"
          @mousedown="startResize($event, 'top')"
        />
        <!-- Bottom -->
        <div
          class="absolute bg-gray-700 w-[10px] h-[10px] cursor-ns-resize"
          :style="{ top: `${(model.position.y + model.height - 10)* props.zoomLevel}px`, left: `${(model.position.x + (model.width - 10) / 2) * props.zoomLevel}px`, transform: `scale(${props.zoomLevel})`, transformOrigin: 'top left' }"
          @mousedown="startResize($event, 'bottom')"
        />
      </div>
    </div>
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
    <div
      v-if="ghostDimensions"
      class="absolute border-2 border-dashed bg-gray-300 opacity-50 cursor-move"
      :style="{
        width: ghostDimensions.width * props.zoomLevel + 'px',
        height: ghostDimensions.height * props.zoomLevel + 'px',
        top: model.position.y * props.zoomLevel + 'px',
        left: model.position.x * props.zoomLevel + 'px',
      }"
    >
      <span class="absolute inset-0 flex items-center justify-center font-semibold pointer-events-none">
        {{ model.name }} MAKLO GAMING {{ ghostDimensions }}
      </span>
    </div>
  </div>
</template>
