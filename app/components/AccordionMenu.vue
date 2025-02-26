<script lang="ts" setup>
export interface subMenuAccordion {
  title: string;
  value: string;
  content?: any;
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
  <div class="p-2">
    <Accordion value="0">
      <AccordionPanel
        v-for="subMenu in subMenus"
        :key="subMenu.title"
        :value="subMenu.value"
      >
        <AccordionHeader
          pt:toggleicon="!hidden"
        >
          <div class="w-full flex justify-between">
            <div class="flex items-center gap-4">
              <Icon
                class="w-6 h-6 mr-2"
                name="uil:angle-down"
              />
              <p>
                {{ subMenu.title }}
              </p>
            </div>
          </div>
        </AccordionHeader>
        <AccordionContent>
          <slot :name="subMenu.value" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
