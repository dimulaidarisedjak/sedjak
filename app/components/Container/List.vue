<script lang="ts" setup>
import type { ContainerAttributes } from '~/components/CanvasObject.vue'

const model = defineModel<ContainerAttributes[]>('modelValue', { required: true })

function onClick(name: string) {
  model.value.findIndex((c: ContainerAttributes) => {
    if (c.name === name) {
      c.isSelected = !c.isSelected
    }
  })
}
function onDelete(key: string) {
  model.value = model.value.filter((c: ContainerAttributes) => c.name !== key)
}
</script>

<template>
  <div>
    <div
      v-for="container in model"
      :key="container.name"
      class="flex justify-between items-center gap-4"
    >
      <EditableButton
        v-model="container.name"
        class="w-full"
        @click="onClick"
      />
      <Button
        text
        severity="danger"
        @click="onDelete(container.name)"
      >
        <Icon
          class="w-4 h-4"
          name="uil:trash"
        />
      </Button>
    </div>
    <div />
  </div>
</template>
