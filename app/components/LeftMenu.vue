<script lang="ts" setup>
import type { TreeNode } from 'primevue/treenode'

const props = defineProps<{
  modelValue: TreeNode[]
}>()
const emits = defineEmits(['update:modelValue'])
const nodes = ref(props.modelValue)

function addChild(parentKey: string) {
  const findNode = (nodeList: Record<string, any>[]) => {
    for (const node of nodeList) {
      if (node.key === parentKey) {
        if (!node.children) node.children = []

        // Generate a unique key for the new child
        const newKey = `${parentKey}-${node.children.length}`

        // Add the new child with empty values
        node.children.push({
          key: newKey,
          label: '',
          data: '',
        })

        // node.expanded = true // Ensure the parent is expanded
        return true
      }

      if (node.children) {
        if (findNode(node.children)) return true
      }
    }
    return false
  }

  findNode(nodes.value)
}
watch(nodes, () => emits('update:modelValue', nodes.value))
</script>

<template>
  <Tree
    :value="nodes"
    class=""
    :pt="{
      nodeLabel: {
        class: 'flex w-full',
      },
      root: {
        class: '!px-0 !py-2',
      },
    }"
  >
    <template #default="slotProps">
      <div
        v-if="slotProps.node.children"
        class="w-full flex justify-between items-center"
      >
        <p class="flex-1 text-sm">
          {{ slotProps.node.label }}
        </p>
        <Button
          label="+"
          size="small"
          text
          @click="addChild(slotProps.node.key)"
        />
      </div>
      <div v-else>
        <EditableButton v-model="slotProps.node.label" />
      </div>
    </template>
  </Tree>
</template>
