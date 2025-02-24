<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});
const emits = defineEmits(['update:modelValue']);
const modelValue = ref(props.modelValue);

watch(modelValue, () => emits('update:modelValue', modelValue.value));
</script>

<template>
  <div>
    <InputGroup>
      <InputGroupAddon
        v-if="$slots.addon"
        :pt="{
          root: {
            class: '!min-w-8 !px-0 !py-0 !text-xs !font-semibold',
          },
        }"
      >
        <slot name="addon" />
      </InputGroupAddon>
      <InputNumber
        v-model="modelValue"
        :pt="{
          pcInputText: {
            root: '!px-2 !py-1 !text-xs !w-full',
          },
        }"
      />
    </InputGroup>
  </div>
</template>
