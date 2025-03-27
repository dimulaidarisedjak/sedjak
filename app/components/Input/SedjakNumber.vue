<script lang="ts" setup>
const model = defineModel<number>('modelValue', { required: true })
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
        v-model="model"
        :pt="{
          pcInputText: {
            root: '!px-2 !py-1 !text-xs !w-full',
          },
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
