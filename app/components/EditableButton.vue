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
    <input
      v-if="isEditing"
      ref="inputRef"
      v-model="label"
      type="text"
      class="w-full p-1 border rounded-md"
      @keydown.enter="save"
      @blur="save"
    >
    <Button
      v-else
      :label="label"
      class="w-full p-button-outlined"
      size="small"
      text
      @click="handleClick"
      @dblclick="edit"
    />
  </div>
</template>
