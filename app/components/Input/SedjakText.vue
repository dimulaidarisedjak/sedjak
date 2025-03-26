<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue'])
const modelValue = ref(props.modelValue)

watch(modelValue, () => emits('update:modelValue', modelValue.value))
</script>

<template>
  <div>
    <InputGroup class="flex items-center">
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
      <InputText
        v-model="modelValue"
        :pt="{
          root: '!px-2 !py-1 !text-xs !w-full',
        }"
      />
      <InputGroupAddon
        v-if="$slots.addonRight"
        :pt="{
          root: {
            class: '!min-w-8 !px-0 !py-0 !text-xs !font-semibold',
          },
        }"
      >
        <slot name="addonRight" />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
