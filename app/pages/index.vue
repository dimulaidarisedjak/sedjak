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

const description
  = 'Gavarnie is a modern and flexible SaaS template for Nuxt and NuxtHub that can be used to build any application.'

useSeoMeta({
  title: 'Gavarnie - Modern SaaS Template for Nuxt and NuxtHub',
  description,
})
</script>

<template>
  <div>
    <AppHeader />
    <Button
      label="test"
      @click="isDark = !isDark"
    />
  </div>
</template>
