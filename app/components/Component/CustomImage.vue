<script lang="ts" setup>
import type { ContainerAttributes } from '~/components/CanvasObject.vue'

const model = defineModel<ContainerAttributes>({ required: true })
const isHovered = defineModel<boolean>('isHovered', { required: true })
const props = defineProps({
  zoomLevel: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
})
const emits = defineEmits(['onMouseDown'])

function onMouseDown(event: MouseEvent) {
  emits('onMouseDown', event)
}
function getBlobURL(filename: string) {
  const image: any = props.images.find((image: any) => image.pathname.split('/')[1] === filename)
  if (image) {
    return image.url
  } else {
    return ''
  }
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
    <img
      class="w-full h-full"
      :src="getBlobURL(model.properties.src)"
    >
  </div>
</template>
