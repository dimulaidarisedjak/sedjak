<script lang="ts" setup>
const items = ref([
  // {
  //   label: 'Beranda',
  //   route: '/',
  // },
  // {
  //   label: 'Fitur',
  //   route: '/fitur',
  // },
  // {
  //   label: 'Tentang',
  //   route: '/tentang',
  // },
  // {
  //   label: 'Harga',
  //   route: '/harga',
  // },
  // {
  //   label: 'Testimoni',
  //   route: '/testimoni',
  // },
  // {
  //   label: 'FAQ',
  //   route: '/faq',
  // },
  {
    label: 'Builder',
    route: '/builder',
  },
])
</script>

<template>
  <div>
    <Menubar
      class="m-8 flex justify-between"
      :model="items"
      :pt="{
        end: {
          class: 'flex !ml-0',
        },
      }"
    >
      <template #start>
        <p>
          Sedjak.com
        </p>
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
      <template
        #end
      >
        <div class="flex gap-2">
          <Button>
            <NuxtLink
              class="font-semibold"
              to="/api/login"
              external
            >
              Masuk
            </NuxtLink>
          </Button>
          <Button>
            <NuxtLink
              class="font-semibold"
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
