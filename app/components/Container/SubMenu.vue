<script lang="ts" setup>
import type { ContainerAttributes } from '~/components/CanvasObject.vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<ContainerAttributes>,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue'])
const modelValue = ref(props.modelValue)

watch(modelValue, () => emits('update:modelValue', modelValue.value), {
  deep: true,
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div id="container-position">
      <label class="flex text-[0.65rem] mb-2 font-semibold">Position</label>
      <div class="flex gap-2">
        <InputSedjakNumber
          v-model="modelValue.position.x"
          class="basis-1/2"
        >
          <template #addon>
            <span>X</span>
          </template>
        </InputSedjakNumber>
        <InputSedjakNumber
          v-model="modelValue.position.y"
          class="basis-1/2"
        >
          <template #addon>
            <span>Y</span>
          </template>
        </InputSedjakNumber>
      </div>
    </div>
    <div id="container-dimension">
      <label class="flex text-[0.65rem] mb-2 font-semibold">Dimension</label>
      <div class="flex gap-2">
        <InputSedjakNumber
          v-model="modelValue.width"
          class="basis-1/2"
        >
          <template #addon>
            <span>W</span>
          </template>
        </InputSedjakNumber>
        <InputSedjakNumber
          v-model="modelValue.height"
          class="basis-1/2"
        >
          <template #addon>
            <span>H</span>
          </template>
        </InputSedjakNumber>
      </div>
    </div>
  </div>
</template>
