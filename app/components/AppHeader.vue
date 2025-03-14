<script lang="ts" setup>
const emits = defineEmits(['scrollTo'])
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
    label: 'Fitur',
    id: 'home-features',
  },
  {
    label: 'Tentang',
    id: 'home-introduction',
  },
  {
    label: 'Harga',
    id: 'home-pricing',
  },
  {
    label: 'Testimoni',
    id: 'home-testimonials',
  },
  {
    label: 'FAQ',
    id: 'home-faq',
  },
])
const userMenu = ref()
const userMenuItems = ref([
  {
    label: 'Keluar',
    route: '/api/logout',
    external: true,
  },
  {
    label: 'Dasbor',
    route: '/dashboard',
    external: false,
  },
])

function toggleUserMenu($event: any) {
  userMenu.value.toggle($event)
}
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
        <div
          class="flex gap-2 items-center cursor-pointer"
          @click="$router.push('/')"
        >
          <img
            src="/images/sedjak-logo.png"
            class="w-8 h-8"
          >
          <p class="font-semibold hover:scale-105 transition-all">
            Sedjak
          </p>
        </div>
      </template>
      <template #item="{ item, props }">
        <p
          v-ripple
          class="cursor-pointer px-2 py-1"
          v-bind="props"
          @click="emits('scrollTo', item.id)"
        >
          {{ item.label }}
        </p>
      </template>
      <template #end>
        <div class="flex gap-2 items-center">
          <Icon
            :name="isDark ? 'uil:moon' : 'uil:sun'"
            class="w-6 h-6 cursor-pointer hover:scale-110"
            @click="isDark = !isDark"
          />
          <div
            v-if="!$auth.loggedIn"
            class="flex gap-2"
          >
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
          <div
            v-else
            class="flex text-sm gap-2 items-center"
          >
            <p class="font-medium">
              Halo,
            </p>
            <p class="font-bold">
              {{ $auth.user.given_name }}
            </p>
            <Button
              pt:root:class="!p-1 !min-w-0"
              text
              aria-haspopup="true"
              aria-controls="overlay_user_menu"
              @click="toggleUserMenu"
            >
              <Icon
                class="text-black w-5 h-5"
                name="uil:ellipsis-v"
              />
            </Button>
            <Menu
              id="overlay_user_menu"
              ref="userMenu"
              :model="userMenuItems"
              :popup="true"
            >
              <template #item="{ item, props }">
                <NuxtLink
                  v-if="item.route"
                  v-slot="{ href, navigate }"
                  :to="item.route"
                  :external="item.external"
                  custom
                >
                  <a
                    v-ripple
                    :href="href"
                    v-bind="props.action"
                    @click="navigate"
                  >
                    {{ item.label }}
                  </a>
                </NuxtLink>
              </template>
            </Menu>
          </div>
        </div>
      </template>
    </Menubar>
  </div>
</template>
