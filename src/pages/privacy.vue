<template>
  <DefaultLayout>
    <section class="relative py-28 bg-white dark:bg-[#080B14] overflow-hidden transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            Privacy Policy
          </h1>
          <p v-if="lastUpdated" class="text-slate-500">Last updated: {{ lastUpdated }}</p>
        </div>

        <div v-if="loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="error" class="text-center py-20">
          <p class="text-red-500">{{ error }}</p>
          <button @click="fetchContent" class="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg">Retry</button>
        </div>

        <div v-else class="prose prose-slate dark:prose-invert max-w-none" v-html="content">
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { getPublicConfig } from '@/services/config.service'
import AOS from 'aos'

const content = ref('')
const lastUpdated = ref('')
const loading = ref(true)
const error = ref('')

const fetchContent = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await getPublicConfig('PRIVACY_POLICY')
    // Support both direct string or object with content
    if (typeof data === 'string') {
      content.value = data
    } else {
      content.value = data.content || ''
      lastUpdated.value = new Date(data.updatedAt || Date.now()).toLocaleDateString()
    }
  } catch (err: any) {
    error.value = 'Privacy Policy content not yet configured. Please check back later.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchContent()
  AOS.init({ duration: 800, once: true })
})
</script>

<route lang="yaml">
meta:
  layout: false
</route>
