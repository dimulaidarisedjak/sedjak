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
    <div
      v-if="modelValue.component === 'text'"
      id="text-text"
    >
      <label class="flex text-[0.65rem] mb-2 font-semibold">Text</label>
      <InputSedjakText
        v-model="modelValue.properties.text"
      >
        <template #addon>
          <span>T</span>
        </template>
      </InputSedjakText>
    </div>
    <div
      v-if="modelValue.component === 'text'"
      class="flex gap-2"
    >
      <div
        id="text-size"
      >
        <label class="flex text-[0.65rem] mb-2 font-semibold">Size</label>
        <InputSedjakNumber
          v-model="modelValue.properties.size"
        >
          <template #addonRight>
            <span>px</span>
          </template>
        </InputSedjakNumber>
      </div>
      <div id="text-color">
        <label class="flex text-[0.65rem] mb-2 font-semibold">Color</label>
        <InputSedjakText
          v-model="modelValue.properties.color"
        >
          <template #addon>
            <span>#</span>
          </template>
        </InputSedjakText>
      </div>
    </div>
  </div>
</template>
