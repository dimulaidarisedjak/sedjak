<script lang="ts" setup>
const { $viewport } = useNuxtApp()
const emits = defineEmits(['scrollTo'])
</script>

<template>
  <div class="p-12 bg-[#85582E] flex justify-between">
    <div class="flex flex-col justify-between text-white">
      <div class="md:w-[300px]">
        <div class="flex items-center gap-4 mb-4">
          <img
            src="/images/sedjak-logo.png"
            class="w-12 h-12"
          >
          <p class="font-semibold">
            Sedjak
          </p>
        </div>
        <p>Sedjak memudahkan Anda untuk membuat website yang sesuai dengan kebutuhan bisnis Anda.</p>
      </div>
      <p>Copyright 2024 Sedjak, All rights reserved.</p>
    </div>
    <div
      v-if="$viewport.isGreaterThan('sm')"
      class="flex gap-20 text-white"
    >
      <div class="flex flex-col justify-between">
        <div class="flex flex-col gap-2">
          <p class="mb-2 font-semibold">
            Lebih Jauh
          </p>
          <p
            class="hover:bg-[#A36C39] px-2 py-1 rounded cursor-pointer v-ripple"
            @click="emits('scrollTo', 'home-features')"
          >
            Fitur
          </p>
          <p
            class="hover:bg-[#A36C39] px-2 py-1 rounded cursor-pointer v-ripple"
            @click="emits('scrollTo', 'home-pricing')"
          >
            Harga
          </p>
          <p
            class="hover:bg-[#A36C39] px-2 py-1 rounded cursor-pointer v-ripple"
            @click="emits('scrollTo', 'home-introduction')"
          >
            Tentang Kami
          </p>
        </div>
        <NuxtLink
          class="hover:bg-[#A36C39] px-2 py-1 rounded"
          to="/terms"
        >
          Syarat dan Ketentuan
        </NuxtLink>
      </div>
      <div class="flex flex-col justify-between">
        <div class="flex flex-col gap-2">
          <p class="mb-2 font-semibold">
            Kontak
          </p>
          <p class="px-2 py-1">
            cs@sedjak.com
          </p>
          <p class="px-2 py-1">
            (+62) 822-2222-2222
          </p>
          <p class="px-2 py-1">
            Kota Sumenep, Jawa Timur, Indonesia
          </p>
        </div>
        <NuxtLink
          class="hover:bg-[#A36C39] px-2 py-1 rounded"
          to="/privacy-policy"
        >
          Kebijakan Privasi
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
