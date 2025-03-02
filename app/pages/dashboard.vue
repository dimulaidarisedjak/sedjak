<script lang="ts" setup>
definePageMeta({
  middleware: 'auth-logged-in',
})

const title = 'Dasbor' + ' | ' + useRuntimeConfig().app.name
const activeMenuItem = ref<string>('dashboard')
const sidebarMode = ref<'collapsed' | 'expanded'>('expanded')
const templates = ref([
  {
    name: 'Inspira',
    description: 'Modern, Minimalis',
    image: '/images/gavarnie.jpg',
  },
  {
    name: 'Craftsy',
    description: 'Portfolio, Minimalis',
    image: '/images/gavarnie.jpg',
  },
  {
    name: 'TechSavvy',
    description: 'Tekno, Minimalis, Modern',
    image: '/images/gavarnie.jpg',
  },
  {
    name: 'KulinerKu',
    description: 'Bisnis, Kuliner',
    image: '/images/gavarnie.jpg',
  },
])
const guides = ref([
  {
    name: 'Membuat Sticky Navbar',
    description: '5 - 10 menit',
    image: '/images/gavarnie.jpg',
  },
  {
    name: 'Membuat Website Responsif',
    description: '15 - 20 menit',
    image: '/images/gavarnie.jpg',
  },
  {
    name: 'Membuat Post',
    description: '5 - 10 menit',
    image: '/images/gavarnie.jpg',
  },
  {
    name: 'Mengubah Domain',
    description: '5 - 10 menit',
    image: '/images/gavarnie.jpg',
  },
])
const newInformations = ref([
  {
    name: 'Pustaka Gambar & Video Gratis',
    description: 'Akses ribuan gambar dan video berkualitas tinggi yang bebas digunakan.',
  },
  {
    name: 'Fitur Blog Dinamis',
    description: 'Tambahkan halaman blog dengan alat yang mempermudah penulisan dan pengaturan konten.',
  },
  {
    name: 'Analisa Website Terintegrasi',
    description: 'Fitur untuk melacak performa website, seperti jumlah pengunjung, asal trafik, halaman terpopuler, dan durasi kunjungan.',
  },
])

function goToRickRoll() {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
}

useSeoMeta({
  title,
})
</script>

<template>
  <div class="flex">
    <SidebarMenu
      v-model="activeMenuItem"
      v-model:sidebar-mode="sidebarMode"
      class="fixed overflow-y-hidden transition-all"
    />
    <div
      :class="{
        'flex-1 bg-[#FAFAFA] overflow-y-auto transition-all': true,
        'ml-56': sidebarMode === 'expanded',
        'ml-16': sidebarMode === 'collapsed',
      }"
    >
      <div
        v-if="activeMenuItem === 'dashboard'"
      >
        <div
          id="dashboard-header"
          class="p-6"
        >
          <p class="text-3xl font-semibold">
            Beranda
          </p>
        </div>
        <div
          id="dashboard-subheader"
          class="p-6 bg-[#85582E] flex flex-col gap-2 text-white"
        >
          <p class="text-xl font-semibold">
            Buat Website dengan Langkah yang Mudah
          </p>
          <p class="text-sm">
            Buat website yang Anda inginkan dengan menggunakan template yang tersedia. Lihat panduannya pada konten yang kami sediakan.
          </p>
        </div>
        <div
          id="dashboard-content"
          class="flex flex-col p-6 gap-6"
        >
          <div class="flex flex-col">
            <p class="mb-6 text-xl font-semibold">
              Gunakan Template Siap Pakai
            </p>
            <div class="grid grid-cols-4 gap-8">
              <div
                v-for="template in templates"
                :key="template.name"
                class="flex flex-col gap-4 cursor-pointer hover:scale-105 transition-all ease-in"
                @click="goToRickRoll"
              >
                <img
                  class="aspect-[2/1] object-cover rounded-2xl"
                  :src="template.image"
                >
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">
                    {{ template.name }}
                  </p>
                  <p class="text-sm">
                    {{ template.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <p class="mb-6 text-xl font-semibold">
              Lihat Panduan Pembuatan Website
            </p>
            <div class="grid grid-cols-4 gap-8">
              <div
                v-for="guide in guides"
                :key="guide.name"
                class="flex flex-col gap-4 cursor-pointer hover:scale-105 transition-all ease-in"
                @click="goToRickRoll"
              >
                <img
                  class="aspect-[2/1] object-cover rounded-2xl"
                  :src="guide.image"
                >
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">
                    {{ guide.name }}
                  </p>
                  <p class="text-sm">
                    {{ guide.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <p class="mb-6 text-xl font-semibold">
              Pemberitahuan Terbaru
            </p>
            <div class="flex gap-8">
              <div class="flex flex-col basis-2/3">
                <Card
                  v-for="information in newInformations"
                  :key="information.name"
                  pt:title="text-black !text-lg"
                  pt:root:class="!bg-[#FDEAD5] !text-black my-4"
                >
                  <template #title>
                    <div class="flex gap-4 items-center">
                      <p class="font-semibold">
                        {{ information.name }}
                      </p>
                      <Tag
                        class="!bg-[#FACE9E] !text-[#85582E] !py-1 !px-2"
                        size="small"
                        rounded
                      >
                        <p class="text-xs">
                          Baru
                        </p>
                      </Tag>
                    </div>
                  </template>
                  <template #content>
                    <p class="text-sm">
                      {{ information.description }}
                    </p>
                  </template>
                </Card>
              </div>
              <Card
                class="basis-1/3 my-4 !bg-[#85582E]"
                pt:content="flex flex-1"
                pt:body="h-full"
              >
                <template #title>
                  <p class="text-white">
                    Yuk! Gabung dengan Komunitas Sedjak
                  </p>
                </template>
                <template #content>
                  <div class="flex flex-col h-full justify-between">
                    <p class="text-white text-sm">
                      Temukan inspirasi, diskusikan ide, dan dapatkan tips membangun website bersama para pelaku UMKM lainnya. Yuk, bergabung sekarang dan tumbuh bersama!
                    </p>
                    <Button
                      class="!bg-[#5865F2] !border-0"
                      @click="goToRickRoll"
                    >
                      <div class="flex gap-2 items-center">
                        <Icon
                          name="uil:discord"
                          class="w-8 h-8"
                        />
                        <p class="text-sm text-white">
                          Gabung di Discord Sedjak
                        </p>
                      </div>
                    </Button>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
