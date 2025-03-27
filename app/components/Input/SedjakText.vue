<script lang="ts" setup>
const model = defineModel<string>('modelValue', { required: true })
</script>

<template>
  <div>
    <InputGroup class="flex items-stretch">
      <InputGroupAddon
        v-if="$slots.addon"
        :pt="{
          root: {
            class: '!min-w-8 !px-2 !py-1 !text-xs !font-semibold',
          },
        }"
      >
        <slot name="addon" />
      </InputGroupAddon>
      <InputText
        v-model="model"
        :pt="{
          root: '!px-2 !py-1 !text-xs !w-full',
        }"
      />
      <InputGroupAddon
        v-if="$slots.addonRight"
        :pt="{
          root: {
            class: '!min-w-8 !px-2 !py-1 !text-xs !font-semibold',
          },
        }"
      >
        <slot name="addonRight" />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
