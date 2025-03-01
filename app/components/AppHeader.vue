<script lang="ts" setup>
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
const items = ref([
  {
    label: 'Beranda',
    route: '/',
  },
  {
    label: 'Fitur',
    route: '/features',
  },
  {
    label: 'Tentang',
    route: '/about',
  },
  {
    label: 'Harga',
    route: '/pricing',
  },
  {
    label: 'Testimoni',
    route: '/testimonials',
  },
  {
    label: 'FAQ',
    route: '/faq',
  },
  {
    label: 'Builder',
    route: '/builder',
  },
])
</script>

<template>
  <div>
    <Menubar
      class="flex justify-between"
      :model="items"
      :pt="{
        end: {
          class: 'flex !ml-0',
        },
      }"
    >
      <template #start>
        <div class="flex gap-2 items-center">
          <Icon
            name="uil:github"
            class="w-8 h-8"
          />
          <p>Sedjak</p>
        </div>
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <RouterLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          custom
          :to="item.route"
        >
          <a
            v-ripple
            :href="href"
            v-bind="props.action"
            @click="navigate"
          >
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span>{{ item.label }}</span>
          <span
            v-if="hasSubmenu"
            class="pi pi-fw pi-angle-down"
          />
        </a>
      </template>
      <template #end>
        <div class="flex gap-2 items-center">
          <Icon
            :name="isDark ? 'uil:moon' : 'uil:sun'"
            class="w-6 h-6 cursor-pointer hover:scale-110"
            @click="isDark = !isDark"
          />
          <Button
            pt:root:class="!px-2 !py-1 !min-w-0"
            outlined
          >
            <NuxtLink
              class="font-semibold text-sm"
              to="/api/login"
              external
            >
              Masuk
            </NuxtLink>
          </Button>
          <Button pt:root:class="!px-2 !py-1 !min-w-0">
            <NuxtLink
              class="font-semibold text-sm"
              to="/api/register"
              external
            >
              Daftar
            </NuxtLink>
          </Button>
        </div>
      </template>
    </Menubar>
  </div>
</template>
