<!-- <script lang="ts" setup>
const appUrl = useRuntimeConfig().app.url

useSeoMeta({
  ogImage: `${appUrl}/images/og.png`,
  twitterImage: `${appUrl}/images/og.png`,
  twitterCard: 'summary_large_image',
})
</script>

 -->
<template>
  <div>
    <slot />
  </div>
</template>
