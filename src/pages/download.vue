<template>
  <DefaultLayout>
    <div class="pt-10 min-h-screen flex flex-col justify-center">
      <DownloadSection />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DownloadSection from '@/components/DownloadSection.vue'
</script>

<route lang="yaml">
meta:
  layout: false
</route>
