<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'New Item',
  },
})
const emits = defineEmits(['update:modelValue', 'click'])
const label = ref(props.modelValue)
const isEditing = ref(false)
const inputRef = ref(null)

const edit = () => {
  isEditing.value = true
  nextTick(() => inputRef.value?.focus())
}

const save = () => {
  if (label.value.trim() === '') label.value = props.modelValue
  isEditing.value = false
}

const handleClick = () => {
  emits('click', label.value)
}
</script>

<template>
  <div>
    <InputText
      v-if="isEditing"
      ref="inputRef"
      v-model="label"
      class="w-full p-1 border rounded-md"
      pt:root:class="!px-2 !py-1 text-sm"
      @keydown.enter="save"
      @blur="save"
    />
    <Button
      v-else
      class="w-full p-button-outlined justify-start"
      text
      pt:root:class="!px-2 !py-1 !justify-start text-sm"
      @click="handleClick"
      @dblclick="edit"
    >
      {{ label }}
    </Button>
  </div>
</template>
