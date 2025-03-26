<script lang="ts" setup>
const model = defineModel<string>({ required: true })
const sidebarMode = defineModel<'collapsed' | 'expanded'>('sidebarMode', { required: true })
const sidebarMenuItems = ref([
  {
    label: 'Beranda',
    value: 'dashboard',
    icon: 'uil:home',
  },
  {
    label: 'Website',
    value: 'website',
    icon: 'uil:globe',
  },
  {
    label: 'Domain',
    value: 'domain',
    icon: 'uil:link',
  },
  {
    label: 'Email',
    value: 'email',
    icon: 'uil:envelope',
  },
  {
    label: 'Tagihan',
    value: 'billing',
    icon: 'uil:credit-card',
  },
])

function emitActiveMenuItem(value: string) {
  if (value === model.value) {
    return
  } else {
    model.value = value
  }
}
</script>

<template>
  <div
    :class="{
      'w-16 p-2': sidebarMode === 'collapsed',
      'w-56 p-6': sidebarMode === 'expanded',
    }"
    class="bg-[#F9F2E7] h-screen flex flex-col gap-4 border-r border-[#85582E] overflow-y-auto"
  >
    <div
      :class="{
        'flex items-center gap-2 justify-between px-3': sidebarMode === 'expanded',
        'flex p-2 flex-col items-center gap-4': sidebarMode === 'collapsed',
      }"
    >
      <img
        v-if="sidebarMode === 'expanded'"
        src="/images/sedjak-logo.png"
        class="w-8 h-8 hover:cursor-pointer hover:scale-105 transition-all"
        @click="$router.push('/')"
      >
      <p
        v-if="sidebarMode === 'expanded'"
        class="font-semibold hover:cursor-pointer hover:scale-105 transition-all"
        @click="$router.push('/')"
      >
        Sedjak
      </p>
      <Button
        text
        class="!p-1"
        @click="sidebarMode = sidebarMode === 'collapsed' ? 'expanded' : 'collapsed'"
      >
        <Icon
          v-if="sidebarMode === 'expanded'"
          name="uil:left-arrow-from-left"
          class="w-6 h-6"
        />
        <Icon
          v-else
          name="uil:arrow-from-right"
          class="w-6 h-6"
        />
      </Button>
      <img
        v-if="sidebarMode === 'collapsed'"
        src="/images/sedjak-logo.png"
        class="w-8 h-8"
      >
    </div>
    <div
      id="sidebar-menu-items"
      class="flex flex-col gap-2"
    >
      <Button
        v-for="item in sidebarMenuItems"
        :key="item.value"
        class="w-full !justify-start"
        :class="{
          '!bg-[#FDEAD5] !border !border-[#85582E]': item.value === model,
        }"
        text
        @click="emitActiveMenuItem(item.value)"
      >
        <div class="flex gap-4 items-center">
          <Icon
            class="w-6 h-6"
            :name="item.icon"
          />
          <p
            v-if="sidebarMode === 'expanded'"
            class="text-sm"
          >
            {{ item.label }}
          </p>
        </div>
      </Button>
    </div>
  </div>
</template>
