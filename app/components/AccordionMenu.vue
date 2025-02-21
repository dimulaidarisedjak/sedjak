<script lang="ts" setup>
export interface subMenuAccordion {
  title: string
  value: string
  content?: any
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<subMenuAccordion[]>,
    required: true,
  },
})

const subMenus = ref(props.modelValue)
</script>

<template>
  <div>
    <Accordion value="0">
      <AccordionPanel
        v-for="subMenu in subMenus"
        :key="subMenu.title"
        :value="subMenu.value"
      >
        <AccordionHeader>{{ subMenu.title }}</AccordionHeader>
        <AccordionContent>
          <slot :name="subMenu.value" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
