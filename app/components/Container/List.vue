<script lang="ts" setup>
import type { ContainerAttributes } from '~/components/CanvasObject.vue'

const model = defineModel<ContainerAttributes[]>('modelValue', { required: true })

function onClick(name: string) {
  model.value.findIndex((c: ContainerAttributes) => {
    if (c.name === name) {
      c.isSelected = !c.isSelected
    }
  })
  console.log('Container', model.value)
}
</script>

<template>
  <div>
    <EditableButton
      v-for="container in model"
      :key="container.name"
      v-model="container.name"
      @click="onClick"
    />
  </div>
</template>
