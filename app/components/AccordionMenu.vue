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
const emits = defineEmits(['add'])
const subMenus = ref(props.modelValue)
const accordionHeaderRef = useTemplateRef('accordionHeaderRef')

function addSubMenu(subMenuValue: string) {
  emits('add', subMenuValue)
}

watch(accordionHeaderRef, () => {
  console.log(accordionHeaderRef.value?.[0]?.$emit('update:value', '0'))
})
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
          ref="accordionHeaderRef"
          :pt="{
            root: { class: 'flex flex-row items-center justify-between !text-sm !font-bold' },
            toggleicon: {
              class: 'mr-2 order-first !hidden', // Add order-first to move icon left
            },
            // Optional: Target the header action button
            headeraction: {
              class: 'flex-row-reverse', // Reverse icon/text order if needed
            },
          }"
        >
          <div class="w-full flex justify-between">
            <div class="flex items-center">
              <Icon
                class="w-6 h-6 mr-2"
                name="uil:angle-down"
              />
              <p>
                {{ subMenu.title }}
              </p>
            </div>
            <Button
              text
              icon=""
              :pt="{

              }"
              @click="addSubMenu(subMenu.value)"
            >
              <template #icon>
                <Icon
                  class="w-4 h-4"
                  name="uil:plus"
                />
              </template>
            </Button>
          </div>
        </AccordionHeader>
        <AccordionContent>
          <slot :name="subMenu.value" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
