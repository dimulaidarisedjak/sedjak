<script lang="ts" setup>
import type { ContainerAttributes } from '~/components/CanvasObject.vue';

const props = defineProps({
  modelValue: {
    type: Array as PropType<ContainerAttributes[]>,
    required: true,
  },
});
const emits = defineEmits(['update:modelValue']);
const modelValue = ref(props.modelValue);
watch(modelValue, () => emits('update:modelValue', modelValue.value), {
  deep: true,
});
</script>

<template>
  <div>
    <EditableButton
      v-for="container in modelValue"
      :key="container.name"
      v-model="container.name"
    />
  </div>
</template>
