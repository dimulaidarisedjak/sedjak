<script lang="ts" setup>
const toast = useToast()
const router = useRouter()

const promoCode = ref<string>('')
const redeemed = ref<boolean>(false)

const codeList = ref<any[]>([
  {
    code: 'SEDJAK1ST',
    discount: 10,
    description: 'Diskon 10% untuk paket keseluruhan layanan',
    services: ['website', 'domain', 'email']
  }
])
const foundCode = ref<any>(null)

const redeemPromoCode = () => {
  foundCode.value = codeList.value.find(code => code.code === promoCode.value.trim());
  if (foundCode) {
    redeemed.value = true
  }
};

const useCode = () => {
  if (foundCode.value) {
    toast.add({ severity: 'success', summary: 'Berhasil', detail: `Kode promo ${foundCode.value.code} berhasil digunakan!` })
    redeemed.value = false
    promoCode.value = ''
    setTimeout(() => {
      navigateTo('/')
    }, 2000)
  } else {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Kode promo tidak ditemukan!' })
  }
}
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div
      class="flex flex-col md:flex-row justify-center items-center w-full md:w-1/2 bg-[#F9F2E7] rounded-2xl shadow-lg overflow-hidden">
      <div
        class="bg-[#85582E] text-white text-2xl p-6 md:p-8 md:text-3xl flex items-center justify-center md:rotate-180"
        style="writing-mode: vertical-rl;">
        TUKAR KODE PROMO
      </div>
      <div v-if="!redeemed" class="w-full p-6 md:p-8 text-center md:text-left">
        <p class="text-xl font-semibold">Masukkan Kode Promo</p>
        <InputText v-model="promoCode" placeholder="Kode Promo"
          class="w-full mt-4 p-2 border border-gray-300 rounded-lg" />
        <Button label="Tukarkan" class="w-full mt-4 bg-[#85582E] text-white py-2 rounded-lg" @click="redeemPromoCode" />
      </div>
      <div v-else class="w-full p-6 md:p-8 text-center md:text-left">
        <p class="mt-2 text-2xl font-bold">Diskon {{ foundCode.discount }}%</p>
        <p class="mt-2">{{ foundCode.description }}</p>
        <p class="mt-2">Layanan yang Dapat Digunakan:</p>
        <div class="flex flex-wrap justify-center md:justify-start mt-2">
          <Tag v-for="service in foundCode.services" :key="service" class="mr-2 mb-2">{{ service }}</Tag>
        </div>
        <Button label="Gunakan" class="w-full mt-4 bg-[#85582E] text-white py-2 rounded-lg" @click="useCode" />
      </div>
    </div>
    <Toast />
  </div>
</template>
