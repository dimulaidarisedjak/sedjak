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
    class="absolute transition-all flex items-center justify-center"

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
    <Button
      class="w-full h-full"
      :label="model.properties.label"
      :style="{
        fontSize: model.properties.font_size ? `${model.properties.font_size}px` : '',
        color: model.properties.color ? `#${model.properties.color}` : '',
      }"
      v-bind="model.properties.link ? { href: model.properties.link, target: '_blank', rel: 'noopener' } : {}"
    />
  </div>
</template>
