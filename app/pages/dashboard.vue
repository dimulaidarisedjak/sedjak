<script lang="ts" setup>
import { formatDateIndonesian, formatCurrencyRupiah, alphabetAvatar } from '~~/shared/utils/functions'

definePageMeta({
  middleware: 'auth-logged-in',
})

const auth = useAuth()
const toast = useToast()
const title = 'Dasbor' + ' | ' + useRuntimeConfig().app.name
const activeMenuItem = ref<string>('dashboard')
const sidebarMode = ref<'collapsed' | 'expanded'>('expanded')
const templates = ref([
  {
    name: 'Inspira',
    description: 'Modern, Minimalis',
    image: '/images/template-4.png',
  },
  {
    name: 'Craftsy',
    description: 'Portfolio, Minimalis',
    image: '/images/template-3.png',
  },
  {
    name: 'TechSavvy',
    description: 'Tekno, Minimalis, Modern',
    image: '/images/template-2.png',
  },
  {
    name: 'KulinerKu',
    description: 'Bisnis, Kuliner',
    image: '/images/template-1.png',
  },
  {
    name: 'Agency Kreatif',
    description: 'Bisnis, Kreatif',
    image: '/images/original-815a684a9fb76cd28eae50ecbd2c8e9e.webp',
  },
])
const guides = ref([
  {
    name: 'Membuat Sticky Navbar',
    description: '5 - 10 menit',
    image: '/images/sticky-comparison.png',
  },
  {
    name: 'Membuat Website Responsif',
    description: '15 - 20 menit',
    image: '/images/future-of-responsive-web-design-12grids.jpg',
  },
  {
    name: 'Membuat Post',
    description: '5 - 10 menit',
    image: '/images/1131w-3mJzeoweAr8.webp',
  },
  {
    name: 'Mengubah Domain',
    description: '5 - 10 menit',
    image: '/images/Domain-02-1024x575.png',
  },
  {
    name: 'Berinteraksi dengan Pengunjung',
    description: '20 - 30 menit',
    image: '/images/shutterstock_1028245024-min.jpg',
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
const scrollContainer = ref(null)
const scrollContainer2 = ref(null)

const dataWebsite = ref({
  name: '',
  description: '',
  domain: '',
})
const tableWebsite = ref<any[]>([])

const dataDomain = ref({
  name: '',
  tld: '',
  years: 0,
})
const tableDomain = ref<any[]>([])
const nameDomain = ref<string | undefined>(undefined)
const statusDomain = ref<string | undefined>(undefined)

const dataEmailDomain = ref({
  name: '',
  years: 0,
})
const tableEmailDomain = ref<any[]>([])
const nameEmailDomain = ref<string | undefined>(undefined)
const statusEmailDomain = ref<string | undefined>(undefined)

const tableBill = ref<any[]>([])
const statusBill = ref<string | undefined>(undefined)

const visibleDialogDomain = ref(false)
const visibleDialogEmailDomain = ref(false)
const visibleDialogWebsite = ref(false)

const optionsTLD = ref(['.com', '.co.id', '.net', '.io', '.id', '.org', '.me'])
const optionsWebsiteDomain = ref<any[]>([])
const optionDomainStatus = ref([
  {
    name: 'Aktif',
    value: 'active',
  },
  {
    name: 'Tidak Aktif',
    value: 'inactive',
  },
])
const optionsEmailDomain = ref<any[]>([])
const optionBillStatus = ref([
  {
    name: 'Belum Dibayar',
    value: 'unpaid',
  },
  {
    name: 'Telah Dibayar',
    value: 'paid',
  },
])

const handleScroll = () => {
  if (!scrollContainer.value) return
}
const handleScroll2 = () => {
  if (!scrollContainer2.value) return
}

function goToRickRoll() {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
}

async function createWebsite() {
  if (!auth.user) return
  const jsonData = JSON.stringify([])
  const result: any = await $fetch('/api/web-build', {
    method: 'POST',
    body: {
      name: dataWebsite.value.name,
      description: dataWebsite.value.description,
      domain: dataWebsite.value.domain,
      jsonData: jsonData,
      ownedBy: auth.user.id,
    },
  })
  if (result[0]?.insertedId) {
    toast.add({
      severity: 'success',
      summary: 'Website berhasil dibuat',
      // detail: 'Pergi ke halaman tagihan dan lakukan pembayaran untuk mengaktifkan website',
      life: 10000,
    })
    dataWebsite.value = {
      name: '',
      description: '',
      domain: '',
    }
    tableWebsite.value = await readWebsite()
    visibleDialogWebsite.value = false
  } else {
    toast.add({
      severity: 'error',
      summary: 'Website gagal dibuat',
      detail: 'Silahkan coba lagi atau hubungi tim dukungan',
      life: 10000,
    })
  }
}
async function readWebsite(options?: string) {
  if (!auth.user) return
  const params: any = {
    owned_by: auth.user.id,
  }
  const result = ref<any>()
  if (options) {
    params.options = true
    result.value = await $fetch('/api/domain', {
      method: 'GET',
      params: params,
    })
  } else {
    result.value = await $fetch('/api/web-build', {
      method: 'GET',
      params: params,
    })
  }
  return result.value
}
// async function updateWebsite() {

// }
async function createDomain() {
  if (!auth.user) return
  const result: any = await $fetch('/api/domain', {
    method: 'POST',
    body: {
      name: `${dataDomain.value.name}${dataDomain.value.tld}`.toLowerCase(),
      status: 'inactive',
      expiredAt: new Date(new Date().setFullYear(new Date().getFullYear() + dataDomain.value.years)),
      ownedBy: auth.user.id,
    },
  })
  if (result[0]?.insertedId) {
    toast.add({
      severity: 'success',
      summary: 'Domain berhasil dibuat',
      detail: 'Pergi ke halaman tagihan dan lakukan pembayaran untuk mengaktifkan domain',
      life: 10000,
    })
    dataDomain.value = {
      name: '',
      tld: '',
      years: 0,
    }
    tableDomain.value = await readDomain()
    visibleDialogDomain.value = false
  } else {
    toast.add({
      severity: 'error',
      summary: 'Domain gagal dibuat',
      detail: 'Silahkan coba lagi atau hubungi tim dukungan',
      life: 10000,
    })
  }
}
async function readDomain() {
  if (!auth.user) return
  const params: any = {
    owned_by: auth.user.id,
  }
  if (nameDomain.value) {
    params.name = nameDomain.value
  }
  if (statusDomain.value) {
    params.status = statusDomain.value
  }
  const result: any = await $fetch('/api/domain', {
    method: 'GET',
    params: params,
  })
  return result
}
async function createEmailDomain() {
  if (!auth.user) return
  const result: any = await $fetch('/api/email-domain', {
    method: 'POST',
    body: {
      name: dataEmailDomain.value.name,
      expiredAt: new Date(new Date().setFullYear(new Date().getFullYear() + dataEmailDomain.value.years)),
      ownedBy: auth.user.id,
    },
  })
  if (result[0]?.insertedId) {
    toast.add({
      severity: 'success',
      summary: 'Email berhasil diaktifkan',
      life: 10000,
    })
    dataEmailDomain.value = {
      name: '',
      years: 0,
    }
    tableEmailDomain.value = await readEmailDomain()
    optionsEmailDomain.value = await readEmailDomain('options')
    visibleDialogEmailDomain.value = false
  } else {
    toast.add({
      severity: 'error',
      summary: 'Email gagal diaktifkan',
      detail: 'Silahkan coba lagi atau hubungi tim dukungan',
      life: 10000,
    })
  }
}
async function readEmailDomain(option?: string) {
  if (!auth.user) return
  const params: any = {
    owned_by: auth.user.id,
  }
  if (nameEmailDomain.value) {
    params.name = nameEmailDomain.value
  }
  if (statusEmailDomain.value) {
    params.status = statusEmailDomain.value
  }
  const result: any = ref([])
  if (option && option === 'options') {
    result.value = await $fetch('/api/email-domain', {
      method: 'GET',
      params: {
        options: true,
        owned_by: auth.user.id,
      },
    })
  } else {
    result.value = await $fetch('/api/email-domain', {
      method: 'GET',
      params: params,
    })
  }
  return result.value
}
async function readBill() {
  if (!auth.user) return
  const params: any = {
    owned_by: auth.user.id,
  }
  if (statusBill.value) {
    params.status = statusBill.value
  }
  const result: any = await $fetch('/api/bill', {
    method: 'GET',
    params: params,
  })
  return result
}
async function updateBill(id: number, serviceType: string) {
  if (!auth.user) return
  const result: any = await $fetch(`/api/bill`, {
    method: 'PUT',
    body: {
      id: id,
      status: 'paid',
      serviceType: serviceType,
    },
  })
  tableBill.value = await readBill()
  return result
}

watch(nameDomain, async () => {
  tableDomain.value = await readDomain()
})
watch(statusDomain, async () => {
  tableDomain.value = await readDomain()
})
watch(nameEmailDomain, async () => {
  tableEmailDomain.value = await readEmailDomain()
})
watch(statusEmailDomain, async () => {
  tableEmailDomain.value = await readEmailDomain()
})
watch(statusBill, async () => {
  tableBill.value = await readBill()
})

watch(activeMenuItem, async () => {
  if (activeMenuItem.value === 'website') {
    tableWebsite.value = await readWebsite()
    optionsWebsiteDomain.value = await readWebsite('options')
  } else if (activeMenuItem.value === 'domain') {
    tableDomain.value = await readDomain()
  } else if (activeMenuItem.value === 'email') {
    tableEmailDomain.value = await readEmailDomain()
    optionsEmailDomain.value = await readEmailDomain('options')
  } else if (activeMenuItem.value === 'billing') {
    tableBill.value = await readBill()
  }
})

useSeoMeta({
  title,
})
onBeforeMount(async () => {
  tableWebsite.value = await readWebsite()
  tableDomain.value = await readDomain()
  tableEmailDomain.value = await readEmailDomain()
  tableBill.value = await readBill()
})
onMounted(() => {
  handleScroll()
  handleScroll2()
})
</script>

<template>
  <div class="flex h-screen">
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
            <div class="relative overflow-auto pb-4">
              <!-- Ensured scrollbar visibility -->
              <div
                class="flex gap-8 overflow-x-auto snap-x snap-mandatory px-8 pb-4"
                @scroll="handleScroll"
              >
                <div
                  v-for="template in templates"
                  :key="template.name"
                  class="flex-none w-[calc(25%-8px)] snap-start hover:scale-105 transition-all ease-in cursor-pointer"
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
          </div>
          <div class="flex flex-col">
            <p class="mb-6 text-xl font-semibold">
              Lihat Panduan Pembuatan Website
            </p>
            <div class="relative overflow-auto pb-4">
              <div
                class="flex gap-8 overflow-x-auto snap-x snap-mandatory px-8 pb-4"
                @scroll="handleScroll2"
              >
                <div
                  v-for="guide in guides"
                  :key="guide.name"
                  class="flex-none w-[calc(25%-8px)] snap-start hover:scale-105 transition-all ease-in cursor-pointer"

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
      <div v-else-if="activeMenuItem === 'website'">
        <div
          id="website-header"
          class="p-6"
        >
          <p class="text-3xl font-semibold">
            Website
          </p>
        </div>
        <div
          id="website-subheader"
          class="p-6 border-y border-[#85582E] flex gap-4 justify-end"
        >
          <div>
            <Button
              class="!px-2 !py-1"
              @click="visibleDialogWebsite = true"
            >
              <div class="flex gap-2 items-center text-nowrap">
                <Icon
                  name="uil:plus"
                  class="w-6 h-6"
                />
                <p class="text-sm">
                  Buat Website Baru
                </p>
              </div>
            </Button>
          </div>
        </div>
        <div
          id="website-content"
          class="flex-1"
        >
          <div class="p-6 grid grid-cols-4">
            <div
              v-for="website in tableWebsite"
              :key="website.name"
              class="flex flex-col hover:cursor-pointer hover:scale-105 transition-all ease-in"
              @click="$router.push(`/builder/${website.blobPath.split('/').pop().split('.')[0]}`)"
            >
              <div class="bg-[#FDEAD5] p-6 rounded-t-2xl">
                <p class="text-9xl text-[#85582E] text-center font-semibold">
                  {{ alphabetAvatar(website.name) }}
                </p>
              </div>
              <div class="bg-[#F9F2E7] p-6 rounded-b-2xl flex flex-col gap-2">
                <p class="text-xl">
                  {{ website.name }}
                </p>
                <p class="text-sm">
                  {{ website.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="activeMenuItem === 'domain'">
        <div
          id="domain-header"
          class="p-6"
        >
          <p class="text-3xl font-semibold">
            Domain
          </p>
        </div>
        <div
          id="domain-subheader"
          class="p-6 border-y border-[#85582E] flex gap-4 justify-between"
        >
          <div class="w-full flex gap-4">
            <div class="flex w-1/6">
              <InputGroup>
                <InputGroupAddon pt:root:class="!px-2 !py-1">
                  <Icon name="uil:search" />
                </InputGroupAddon>
                <InputText
                  v-model="nameDomain"
                  pt:root:class="!px-2 !py-1"
                  pt:label="!px-2 !py-1"
                  placeholder="Cari domain"
                />
              </InputGroup>
            </div>
            <div class="flex w-1/6">
              <InputGroup>
                <InputGroupAddon pt:root:class="!px-2 !py-1">
                  <p class="text-sm">
                    Status
                  </p>
                </InputGroupAddon>
                <Select
                  v-model="statusDomain"
                  pt:root:class="!px-0 !py-0"
                  pt:label="!px-2 !py-1"
                  :options="optionDomainStatus"
                  option-label="name"
                  option-value="value"
                />
              </InputGroup>
            </div>
          </div>
          <div>
            <Button
              class="!px-2 !py-1"
              @click="visibleDialogDomain = true"
            >
              <div class="flex gap-2 items-center text-nowrap">
                <Icon
                  name="uil:plus"
                  class="w-6 h-6"
                />
                <p class="text-sm">
                  Tambah Domain
                </p>
              </div>
            </Button>
          </div>
        </div>
        <div
          id="domain-content"
          class="flex-1"
        >
          <DataTable
            class="p-6"
            :value="tableDomain"
          >
            <Column
              field="name"
              header="Domain"
            />
            <Column
              header="Kadaluarsa Pada"
            >
              <template #body="slotProps">
                {{ formatDateIndonesian(new Date(slotProps.data.expiredAt), true) }}
              </template>
            </Column>
            <Column header="Status">
              <template #body="slotProps">
                <Tag
                  v-if="slotProps.data.status === 'inactive'"
                  value="Tidak Aktif"
                  severity="secondary"
                />
                <Tag
                  v-else
                  value="Aktif"
                  severity="success"
                />
              </template>
            </Column>
            <!-- <Column>
              <template #body="slotProps">
                <Button
                  outlined
                  severity="danger"
                  class="!px-2 !py-1"
                >
                  <Icon
                    name="uil:trash"
                    class="w-6 h-6"
                  />
                </Button>
              </template>
            </Column> -->
          </DataTable>
        </div>
      </div>
      <div v-else-if="activeMenuItem === 'email'">
        <div
          id="email-header"
          class="p-6"
        >
          <p class="text-3xl font-semibold">
            Email
          </p>
        </div>
        <div
          id="email-subheader"
          class="p-6 border-y border-[#85582E] flex gap-4 justify-between"
        >
          <div class="w-full flex gap-4">
            <div class="flex w-1/6">
              <InputGroup>
                <InputGroupAddon pt:root:class="!px-2 !py-1">
                  <Icon name="uil:search" />
                </InputGroupAddon>
                <InputText
                  v-model="nameEmailDomain"
                  pt:root:class="!px-2 !py-1"
                  pt:label="!px-2 !py-1"
                  placeholder="Cari email"
                />
              </InputGroup>
            </div>
            <div class="flex w-1/6">
              <InputGroup>
                <InputGroupAddon pt:root:class="!px-2 !py-1">
                  <p class="text-sm">
                    Status
                  </p>
                </InputGroupAddon>
                <Select
                  v-model="statusEmailDomain"
                  pt:root:class="!px-0 !py-0"
                  pt:label="!px-2 !py-1"
                  :options="optionDomainStatus"
                  option-label="name"
                  option-value="value"
                />
              </InputGroup>
            </div>
          </div>
          <div>
            <Button
              class="!px-2 !py-1"
              @click="visibleDialogEmailDomain = true"
            >
              <div class="flex gap-2 items-center text-nowrap">
                <Icon
                  name="uil:plus"
                  class="w-6 h-6"
                />
                <p class="text-sm">
                  Aktifkan Email
                </p>
              </div>
            </Button>
          </div>
        </div>
        <div
          id="domain-content"
          class="flex-1"
        >
          <DataTable
            class="p-6"
            :value="tableEmailDomain"
          >
            <Column header="Domain">
              <template #body="slotProps">
                @{{ slotProps.data.name }}
              </template>
            </Column>
            <Column
              header="Kadaluarsa Pada"
            >
              <template #body="slotProps">
                {{ formatDateIndonesian(new Date(slotProps.data.expiredAt), true) }}
              </template>
            </Column>
            <Column header="Status">
              <template #body="slotProps">
                <Tag
                  v-if="slotProps.data.status === 'inactive'"
                  value="Tidak Aktif"
                  severity="secondary"
                />
                <Tag
                  v-else
                  value="Aktif"
                  severity="success"
                />
              </template>
            </Column>
            <!-- <Column>
              <template #body="slotProps">
                <Button
                  outlined
                  severity="danger"
                  class="!px-2 !py-1"
                >
                  <Icon
                    name="uil:trash"
                    class="w-6 h-6"
                  />
                </Button>
              </template>
            </Column> -->
          </DataTable>
        </div>
      </div>
      <div v-else-if="activeMenuItem === 'billing'">
        <div
          id="bill-header"
          class="p-6"
        >
          <p class="text-3xl font-semibold">
            Tagihan
          </p>
        </div>
        <div
          id="bill-subheader"
          class="p-6 border-y border-[#85582E]"
        >
          <div class="flex w-1/6">
            <InputGroup>
              <InputGroupAddon pt:root:class="!px-2 !py-1">
                <p class="text-sm">
                  Status
                </p>
              </InputGroupAddon>
              <Select
                v-model="statusBill"
                pt:root:class="!px-0 !py-0"
                pt:label="!px-2 !py-1"
                :options="optionBillStatus"
                option-label="name"
                option-value="value"
              />
            </InputGroup>
          </div>
        </div>
        <div
          id="bill-content"
          class="flex-1"
        >
          <DataTable
            class="p-6"
            :value="tableBill"
          >
            <Column
              field="name"
              header="Nama Tagihan"
            />
            <Column header="Layanan">
              <template #body="slotProps">
                <Tag
                  v-if="slotProps.data.serviceType === 'email'"
                  value="Email"
                  severity="info"
                />
                <Tag
                  v-else-if="slotProps.data.serviceType === 'domain'"
                  value="Domain"
                  severity="warn"
                />
              </template>
            </Column>
            <Column
              header="Tanggal Tagihan"
            >
              <template #body="slotProps">
                {{ formatDateIndonesian(new Date(slotProps.data.createdAt), true) }}
              </template>
            </Column>
            <Column header="Status">
              <template #body="slotProps">
                <Tag
                  v-if="slotProps.data.status === 'unpaid'"
                  value="Belum Dibayar"
                  severity="danger"
                />
                <Tag
                  v-else
                  value="Telah Dibayar"
                  severity="success"
                />
              </template>
            </Column>
            <Column header="Biaya">
              <template #body="slotProps">
                {{ formatCurrencyRupiah(slotProps.data.amount) }}
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <Button
                  v-if="slotProps.data.status === 'unpaid'"
                  label="Bayar"
                  class="!px-2 !py-1"
                  outlined
                  @click="updateBill(slotProps.data.id, slotProps.data.serviceType)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="visibleDialogWebsite"
      modal
      header="Buat Website Baru"
    >
      <div class="flex flex-col gap-4">
        <div>
          <label for="website-name">Nama Website</label>
          <InputText
            id="website-name"
            v-model="dataWebsite.name"
            class="w-full mt-2"
          />
        </div>
        <div>
          <label for="website-domain">Domain</label>
          <Select
            id="website-domain"
            v-model="dataWebsite.domain"
            :options="optionsWebsiteDomain"
            option-label="name"
            option-value="id"
            class="w-full mt-2"
          />
        </div>
        <div>
          <label for="website-description">Deskripsi Website</label>
          <Textarea
            id="website-description"
            v-model="dataWebsite.description"
            class="w-full mt-2"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="Buat Website"
          class="w-full"
          @click="createWebsite"
        />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="visibleDialogDomain"
      modal
      header="Tambah Domain"
    >
      <div class="flex flex-col gap-4">
        <div>
          <label for="domain-name">Domain</label>
          <InputGroup
            id="domain-name"
            class="mt-2"
          >
            <InputText
              v-model="dataDomain.name"
              placeholder="contoh"
            />
            <Select
              v-model="dataDomain.tld"
              :options="optionsTLD"
              placeholder=".com"
            />
          </InputGroup>
        </div>
        <div>
          <label for="domain-period">Lama Waktu</label>
          <InputGroup
            id="domain-period"
            class="mt-2"
          >
            <InputNumber
              v-model="dataDomain.years"
              :min="1"
              :show-buttons="true"
            />
            <InputGroupAddon>
              <p>Tahun</p>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <template #footer>
        <Button
          label="Simpan"
          class="w-full"
          @click="createDomain"
        />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="visibleDialogEmailDomain"
      modal
      header="Aktifkan Email"
    >
      <div class="flex flex-col gap-4">
        <div>
          <label for="email-name">Domain</label>
          <Select
            id="email-name"
            v-model="dataEmailDomain.name"
            :options="optionsEmailDomain"
            option-label="name"
            option-value="name"
            class="w-full mt-2"
          />
        </div>
        <div>
          <label for="email-period">Lama Waktu</label>
          <InputGroup
            id="email-period"
            class="mt-2"
          >
            <InputNumber
              v-model="dataEmailDomain.years"
              :min="1"
              :show-buttons="true"
            />
            <InputGroupAddon>
              <p>Tahun</p>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <template #footer>
        <Button
          label="Aktifkan"
          class="w-full"
          @click="createEmailDomain"
        />
      </template>
    </Dialog>
  </div>
</template>

<style>
.scrollbar {
  overflow-x: auto;
  -ms-overflow-style: auto;
  scrollbar-width: auto;
}
</style>
