<script lang="ts" setup>
const emits = defineEmits(['dragstart'])
const componentList = ref<Record<string, string>[]>([
  {
    name: 'Container',
    value: 'container',
    icon: 'uil:vector-square',
  },
  {
    name: 'Text',
    value: 'text',
    icon: 'uil:text',
  },
  {
    name: 'Image',
    value: 'image',
    icon: 'uil:image',
  },
  {
    name: 'Button',
    value: 'button',
    icon: 'uil:link',
  },
  {
    name: 'Panel',
    value: 'panel',
    icon: 'uil:square-shape',
  },
  {
    name: 'Divider',
    value: 'divider',
    icon: 'uil:minus',
  },
  {
    name: 'Card',
    value: 'card',
    icon: 'uil:postcard',
  },
])
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <Button
      v-for="component in componentList"
      :key="component.value"
      :draggable="true"
      outlined
      @dragstart="emits('dragstart', component.value)"
    >
      <div class="flex flex-col items-center">
        <Icon
          class="w-6 h-6"
          :name="(component.icon as string)"
        />
        <p class="text-xs font-semibold">
          {{ component.name }}
        </p>
      </div>
    </Button>
  </div>
</template>
