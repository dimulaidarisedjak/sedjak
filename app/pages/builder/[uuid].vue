<script lang="ts" setup>
import type { ContainerAttributes } from '~/components/CanvasObject.vue'

import { useResize } from '~~/shared/utils/functions'

const route = useRoute()

const { width: leftWidth, startResize: startLeftResize } = useResize()
const { width: rightWidth, startResize: startRightResize } = useResize(
  100,
  400,
  true,
)
const zoomLevel = ref(1) // Initial zoom level
const minZoom = 0.25 // Minimum zoom level
const maxZoom = 2 // Maximum zoom level
const zoomStep = 0.05 // Zoom increment step

const selectedComponent = ref<string>('')
const differentData = ref(false)

const containers = ref<ContainerAttributes[]>([])
const containersOnDB = ref<ContainerAttributes[]>([])
const activeContainerList = computed(() => {
  return containers.value.map((container, idx) => container.isSelected ? idx : '').filter(String)
})

const canvasRef = ref<any>(null)
const contentRef = ref<any>(null)
const componentListActive = ref<string[]>(['0', '1'])
const rightMenuListActive = ref<string[]>(['0', '1'])
// Zoom function (Cursor-centered)
const updateZoom = (delta: any, event: any = null) => {
  const newZoom = Math.min(maxZoom, Math.max(minZoom, zoomLevel.value + delta))
  if (newZoom === zoomLevel.value) return // Prevent redundant updates

  if (event && canvasRef.value && contentRef.value) {
    const rect = canvasRef.value.getBoundingClientRect()
    const offsetX = event.clientX - rect.left + canvasRef.value.scrollLeft
    const offsetY = event.clientY - rect.top + canvasRef.value.scrollTop
    const scaleFactor = newZoom / zoomLevel.value

    requestAnimationFrame(() => {
      canvasRef.value.scrollLeft =
        offsetX * scaleFactor - event.clientX + rect.left
      canvasRef.value.scrollTop =
        offsetY * scaleFactor - event.clientY + rect.top
    })

    zoomLevel.value = newZoom
  } else {
    zoomLevel.value = newZoom
  }
}

// Mouse wheel zoom (cursor-centered)
const handleWheelZoom = (event: any) => {
  if (event.ctrlKey) {
    event.preventDefault()
    updateZoom(event.deltaY < 0 ? zoomStep : -zoomStep, event)
  }
}

// Keyboard zoom (centered)
const handleKeyZoom = (event: any) => {
  if (event.ctrlKey) {
    if (event.code === 'Equal' || event.code === 'NumpadAdd') {
      updateZoom(zoomStep)
    } else if (event.code === 'Minus' || event.code === 'NumpadSubtract') {
      updateZoom(-zoomStep)
    } else if (event.code === 'Digit0' || event.code === 'Numpad0') {
      zoomLevel.value = 1
    }
    event.preventDefault()
    event.stopPropagation()
  }
}

// Prevent browser zoom
const preventBrowserZoom = (event: any) => {
  if (
    event.ctrlKey &&
    [
      'Equal',
      'Minus',
      'Digit0',
      'NumpadAdd',
      'NumpadSubtract',
      'Numpad0',
    ].includes(event.code)
  ) {
    event.preventDefault()
  }
}

function addSubMenu(subMenuValue: string) {
  if (subMenuValue === '0') {
    containers.value.push({
      name: `Container ${containers.value.length + 1}`,
      width: 500,
      height: 500,
      position: { x: 0, y: 0 },
      isSelected: false,
      component: '',
      properties: {},
    })
  }
}

function toggleContainerIndex(event: { type: string, index: number }) {
  const container = containers.value[event.index]

  if (container) {
    if (event.type === 'single') {
      if (activeContainerList.value.length > 1) {
        for (const [index, cntnr] of containers.value.entries()) {
          cntnr.isSelected = index === event.index
        }
      } else {
        if (activeContainerList.value[0] === event.index) {
          container.isSelected = !container.isSelected
        } else {
          for (const [index, cntnr] of containers.value.entries()) {
            cntnr.isSelected = index === event.index
          }
        }
      }
    } else if (event.type === 'multiple') {
      container.isSelected = !containers.value[event.index]?.isSelected
    }
  }
}

function onDragStart(component: string) {
  selectedComponent.value = component
  console.log('onDrag called selectedComponent', selectedComponent.value)
}

async function readBuild() {
  const result: any = await $fetch<any[]>('/api/web-build', {
    method: 'GET',
    params: {
      builder: true,
      uuid: route.params.uuid,
    },
  })
  return JSON.parse(result)
}
async function updateBuild() {
  const result: any = await $fetch('/api/web-build', {
    method: 'PUT',
    body: {
      uuid: route.params.uuid,
      jsonData: JSON.stringify(containers.value),
    },
  })
  if (result) {
    containersOnDB.value = [...containers.value]
  }
}

watch(containers, () => {
  if (!isEqual(containers.value, containersOnDB.value)) {
    differentData.value = true
  } else {
    differentData.value = false
  }
}, { deep: true })

watch(containersOnDB, () => {
  if (!isEqual(containers.value, containersOnDB.value)) {
    differentData.value = true
  } else {
    differentData.value = false
  }
})

onBeforeMount(async () => {
  containers.value = await readBuild()
  containersOnDB.value = [...containers.value]
})

// Attach event listeners
onMounted(() => {
  document.addEventListener('wheel', handleWheelZoom, { passive: false })
  document.addEventListener('keydown', handleKeyZoom)
  document.addEventListener('keydown', preventBrowserZoom)
})

// Cleanup event listeners
onUnmounted(() => {
  document.removeEventListener('wheel', handleWheelZoom)
  document.removeEventListener('keydown', handleKeyZoom)
  document.removeEventListener('keydown', preventBrowserZoom)
})
</script>

<template>
  <div class="flex h-screen w-screen">
    <!-- Left Content (Vertical Scroll Only) -->
    <div
      id="left-content"
      class="bg-neutral-200 relative overflow-y-auto"
      :style="{ width: leftWidth + 'px', height: '100vh' }"
    >
      <div class="py-2 px-2">
        <Button
          class="w-full"
          @click="() => {
            updateBuild()
            navigateTo('/dashboard')
          }"
        >
          <div class="flex">
            <Icon
              class="w-6 h-6"
              name="uil:angle-left"
            />
            <p>
              Kembali ke Dasbor
            </p>
          </div>
        </Button>
      </div>
      <Accordion
        v-model:value="componentListActive"
        class="px-2"
        multiple
      >
        <AccordionPanel value="0">
          <AccordionHeader pt:toggleicon="!hidden">
            <div class="w-full flex items-center justify-between">
              <div class="flex gap-4">
                <Icon
                  class="w-6 h-6 mr-2"
                  name="uil:angle-down"
                />
                <p>Components</p>
              </div>
            </div>
          </AccordionHeader>
          <AccordionContent>
            <ComponentList @dragstart="onDragStart" />
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader pt:toggleicon="!hidden">
            <ClientOnly>
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-4">
                  <Icon
                    class="w-6 h-6 mr-2"
                    name="uil:angle-down"
                  />
                  <p>Containers</p>
                </div>
                <Button
                  text
                  icon=""
                  class="!min-w-0 !w-6 !h-6"
                  @click="addSubMenu('0')"
                >
                  <template #icon>
                    <Icon
                      class="w-4 h-4"
                      name="uil:plus"
                    />
                  </template>
                </Button>
              </div>
            </ClientOnly>
          </AccordionHeader>
          <AccordionContent>
            <ContainerList v-model="containers" />
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
      <div
        class="w-[2px] bg-[#E6E6E6] cursor-col-resize absolute right-0 top-0 bottom-0"
        @mousedown="startLeftResize"
      />
    </div>

    <!-- Canvas (2D Scroll + Cursor-Centered Zoom) -->
    <div
      id="canvas"
      ref="canvasRef"
      class="bg-[#F5F5F5] grid flex-1 w-content overflow-auto p-8"
    >
      <div
        class="flex justify-center"
      >
        <EditorCanvas
          ref="contentRef"
          v-model="containers"
          v-model:selected-component="selectedComponent"
          v-model:canvas-ref="canvasRef"
          v-model:content-ref="contentRef"

          class="relative"
          :style="{
            width: `${4000 * zoomLevel}px`,
            height: `${4000 * zoomLevel}px`,
          }"
          :zoom-level="zoomLevel"
          @click="toggleContainerIndex"
        />
      </div>
    </div>

    <!-- Right Content (Vertical Scroll Only) -->
    <div
      id="right-content"
      class="bg-neutral-200 relative overflow-y-auto justify-between"
      :style="{ width: rightWidth + 'px', height: '100vh' }"
    >
      <div class="h-full flex flex-col">
        <div class="flex justify-end py-2 px-2">
          <Button
            class="w-full"
            label="Simpan"
            @click="updateBuild"
          />
        </div>
        <Accordion
          v-model:value="rightMenuListActive"
          class="px-2"
          multiple
        >
          <AccordionPanel value="0">
            <AccordionHeader pt:toggleicon="!hidden">
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-4">
                  <Icon
                    class="w-6 h-6 mr-2"
                    name="uil:angle-down"
                  />
                  <p>Attributes</p>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div
                v-if="activeContainerList.length > 0"
                class="flex flex-col gap-4"
              >
                <Panel
                  v-for="value in activeContainerList"
                  :key="'container-' + value"
                  :header="(containers[value as any] as ContainerAttributes).name"
                  toggleable
                  :pt="{
                    pcToggleButton: { root: '!min-w-0 !w-8 !h-8' },
                    header: { class: 'flex items-center !text-sm !font-bold' },
                  }"
                >
                  <template #toggleicon="{ collapsed }">
                    <Icon
                      v-if="collapsed"
                      class="w-6 h-6"
                      name="uil:angle-up"
                    />
                    <Icon
                      v-else
                      class="w-6 h-6"
                      name="uil:angle-down"
                    />
                  </template>
                  <ContainerSubMenu
                    v-model="(containers[value as any] as ContainerAttributes)"
                  />
                </Panel>
              </div>
              <p v-else>
                Tidak ada kontainer yang dipilih.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
            <AccordionHeader pt:toggleicon="!hidden">
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-4">
                  <Icon
                    class="w-6 h-6 mr-2"
                    name="uil:angle-down"
                  />
                  <p>Properties</p>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex flex-col gap-4">
                <Panel
                  v-for="value in activeContainerList"
                  :key="'container-' + value"
                  toggleable
                  :header="(containers[value as any] as ContainerAttributes).name"
                >
                  <template #toggleicon="{ collapsed }">
                    <Icon
                      v-if="collapsed"
                      class="w-6 h-6"
                      name="uil:angle-up"
                    />
                    <Icon
                      v-else
                      class="w-6 h-6"
                      name="uil:angle-down"
                    />
                  </template>
                  <ComponentPropertiesSubMenu v-model="(containers[value as any] as ContainerAttributes)" />
                </Panel>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
        <!-- <AccordionMenu
          v-model="rightMenu"
          class="flex-1"
          @add="addSubMenu"
        >
          <template #0>
            <div
              v-if="activeContainerList.length > 0"
              class="flex flex-col gap-4"
            >
              <Panel
                v-for="value in activeContainerList"
                :key="'container-' + value"
                :header="(containers[value as any] as ContainerAttributes).name"
                toggleable
                :pt="{
                  pcToggleButton: { root: '!min-w-0 !w-8 !h-8' },
                  header: { class: 'flex items-center !text-sm !font-bold' },
                }"
              >
                <template #toggleicon="{ collapsed }">
                  <Icon
                    v-if="collapsed"
                    class="w-6 h-6"
                    name="uil:angle-up"
                  />
                  <Icon
                    v-else
                    class="w-6 h-6"
                    name="uil:angle-down"
                  />
                </template>
                <ContainerSubMenu
                  v-model="(containers[value as any] as ContainerAttributes)"
                />
              </Panel>
            </div>
            <p v-else>
              No Container Selected
            </p>
          </template>
        </AccordionMenu> -->
        <div class="flex items-center p-2">
          <Icon
            class="ml-2 w-4 h-4"
            name="uil:search-alt"
          />
          <p class="ml-2">
            {{ Math.round(zoomLevel * 100) }} %
          </p>
        </div>
      </div>

      <div
        class="w-1 bg-gray-500 cursor-col-resize absolute left-0 top-0 bottom-0"
        @mousedown="startRightResize"
      />
    </div>
  </div>
</template>
