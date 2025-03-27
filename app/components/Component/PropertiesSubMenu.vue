<script lang="ts" setup>
import type { ContainerAttributes } from '~/components/CanvasObject.vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<ContainerAttributes>,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue', 'selectImage'])
const modelValue = ref(props.modelValue)

watch(modelValue, () => emits('update:modelValue', modelValue.value), {
  deep: true,
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-if="modelValue.component === 'text'"
      id="text-text"
    >
      <label class="flex text-[0.65rem] mb-2 font-semibold">Text</label>
      <InputSedjakText
        v-model="modelValue.properties.text"
      >
        <template #addon>
          <span>T</span>
        </template>
      </InputSedjakText>
    </div>
    <div
      v-if="modelValue.component === 'text'"
      class="flex gap-2"
    >
      <div
        id="text-size"
      >
        <label class="flex text-[0.65rem] mb-2 font-semibold">Size</label>
        <InputSedjakNumber
          v-model="modelValue.properties.size"
        >
          <template #addonRight>
            <span>px</span>
          </template>
        </InputSedjakNumber>
      </div>
      <div id="text-color">
        <label class="flex text-[0.65rem] mb-2 font-semibold">Color</label>
        <InputSedjakText
          v-model="modelValue.properties.color"
        >
          <template #addon>
            <span>#</span>
          </template>
        </InputSedjakText>
      </div>
    </div>
    <div
      v-if="modelValue.component === 'image'"
      id="image-src"
    >
      <label class="flex text-[0.65rem] mb-2 font-semibold">Source</label>
      <InputSedjakText
        v-model="modelValue.properties.src"
      >
        <template #addonRight>
          <Button
            class="!min-w-8 !p-0 !text-xs !font-light"
            label="Pilih"
            text
            @click="emits('selectImage')"
          />
        </template>
      </InputSedjakText>
    </div>
    <div
      v-if="modelValue.component === 'button'"
      class="flex flex-col gap-2"
    >
      <div id="button-label">
        <label class="flex text-[0.65rem] mb-2 font-semibold">Label</label>
        <InputSedjakText
          v-model="modelValue.properties.label"
        >
          <template #addon>
            <span>T</span>
          </template>
        </InputSedjakText>
      </div>
      <div class="flex flex-row gap-2">
        <div id="button-text-size">
          <label class="flex text-[0.65rem] mb-2 font-semibold">Font Size</label>
          <InputSedjakNumber
            v-model="modelValue.properties.font_size"
          >
            <template #addonRight>
              <span>px</span>
            </template>
          </InputSedjakNumber>
        </div>
        <div id="button-color">
          <label class="flex text-[0.65rem] mb-2 font-semibold">Color</label>
          <InputSedjakText
            v-model="modelValue.properties.color"
          >
            <template #addon>
              <span>#</span>
            </template>
          </InputSedjakText>
        </div>
      </div>
      <div id="button-link">
        <label class="flex text-[0.65rem] mb-2 font-semibold">Link</label>
        <InputSedjakText
          v-model="modelValue.properties.link"
        />
      </div>
    </div>
    <div
      v-if="modelValue.component === 'divider'"
      class="flex flex-col gap-2"
    >
      <div id="divider-thickness">
        <label class="flex text-[0.65rem] mb-2 font-semibold">Thickness</label>
        <InputSedjakNumber
          v-model="modelValue.properties.thickness"
        >
          <template #addonRight>
            <span>px</span>
          </template>
        </InputSedjakNumber>
      </div>
      <div id="divider-color">
        <label class="flex text-[0.65rem] mb-2 font-semibold">Color</label>
        <InputSedjakText
          v-model="modelValue.properties.color"
        >
          <template #addon>
            <span>#</span>
          </template>
        </InputSedjakText>
      </div>
    </div>
    <div
      v-if="modelValue.component === 'card'"
      class="flex flex-col gap-2"
    >
      <div id="card-title">
        <label class="flex text-[0.65rem] mb-2 font-semibold">Title</label>
        <InputSedjakText
          v-model="modelValue.properties.title"
        >
          <template #addon>
            <span>T</span>
          </template>
        </InputSedjakText>
      </div>
      <div id="card-content">
        <label class="flex text-[0.65rem] mb-2 font-semibold">Content</label>
        <InputSedjakText
          v-model="modelValue.properties.content"
        >
          <template #addon>
            <span>T</span>
          </template>
        </InputSedjakText>
      </div>

      <div id="card-image-src">
        <label class="flex text-[0.65rem] mb-2 font-semibold">Image</label>
        <InputSedjakText
          v-model="modelValue.properties.image_src"
        >
          <template #addonRight>
            <Button
              class="!min-w-8 !p-0 !text-xs !font-light"
              label="Pilih"
              text
              @click="emits('selectImage')"
            />
          </template>
        </InputSedjakText>
      </div>
      <div class="flex gap-2">
        <div id="card-color">
          <label class="flex text-[0.65rem] mb-2 font-semibold">Color</label>
          <InputSedjakText
            v-model="modelValue.properties.color"
          >
            <template #addon>
              <span>#</span>
            </template>
          </InputSedjakText>
        </div>
        <div id="card-image-position">
          <label class="flex text-[0.65rem] mb-2 font-semibold">Image Position</label>
          <InputGroup pt:root:class="!w-full">
            <InputGroupAddon pt:root:class="!w-full">
              <Button
                class="!min-w-8 !px-1 !py-[0.2rem] !text-xs !font-light"
                text
                @click="modelValue.properties.image_position = 'left'"
              >
                <Icon
                  class="w-4 h-4"
                  name="uil:arrow-left"
                />
              </Button>
              <Button
                class="!min-w-8 !px-1 !py-[0.2rem] !text-xs !font-light"
                text
                @click="modelValue.properties.image_position = 'top'"
              >
                <Icon
                  class="w-4 h-4"
                  name="uil:arrow-up"
                />
              </Button>
              <Button
                class="!min-w-8 !px-1 !py-[0.2rem] !text-xs !font-light"
                text
                @click="modelValue.properties.image_position = 'bottom'"
              >
                <Icon
                  class="w-4 h-4"
                  name="uil:arrow-down"
                />
              </Button>
              <Button
                class="!min-w-8 !px-1 !py-[0.2rem] !text-xs !font-light"
                text
                @click="modelValue.properties.image_position = 'right'"
              >
                <Icon
                  class="w-4 h-4"
                  name="uil:arrow-right"
                />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  </div>
</template>
