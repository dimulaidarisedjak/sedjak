<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['add-container'])
const newWidth = ref(300)
const newHeight = ref(400)
const newPositionX = ref()
const newPositionY = ref()

const addContainer = () => {
  if (newWidth.value > 0 && newHeight.value > 0) {
    emits('add-container', { width: newWidth.value, height: newHeight.value, position: { x: newPositionX.value, y: newPositionY.value } })
  }
}
</script>

<template>
  <div class="p-4 space-y-2">
    <h2 class="text-lg font-bold">
      Container Controls
    </h2>
    <div class="flex flex-col">
      <InputNumber
        v-model="newWidth"
        placeholder="Width"
      />
      <InputNumber
        v-model="newHeight"
        placeholder="Height"
      />
      <InputNumber
        v-model="newPositionX"
        placeholder="Position X"
      />
      <InputNumber
        v-model="newPositionY"
        placeholder="Position y"
      />
      <Button
        class="bg-blue-500 text-white px-3 py-1 rounded"
        @click="addContainer"
      >
        Add Container
      </Button>
    </div>
  </div>
</template>
