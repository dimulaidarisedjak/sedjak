<script lang="ts" setup>
import { useAttrs, mergeProps, computed } from 'vue'
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

const attrs = useAttrs()

// Make ptRootStyle reactive by using computed()
const ptRootStyle = computed(() => attrs['pt:root:style'] || {})
</script>

<template>
  <div
    v-bind="mergeProps(attrs, { class: 'absolute transition-all flex items-center justify-center' })"
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
    <Card
      class="w-full h-full"
      :style="ptRootStyle"
    >
      <template #title>
        <slot name="title" />
      </template>
      <template #content>
        <slot name="content" />
      </template>
    </Card>
  </div>
</template>
