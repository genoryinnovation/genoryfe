<template>
  <DefaultLayout simpleFooter>
    <section class="relative py-28 bg-white dark:bg-[#080B14] overflow-hidden transition-colors duration-300">
      <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
            Delete Your Account
          </h1>
          <p class="text-slate-500 dark:text-slate-400">
            Permanently delete your Genory account and associated data.
          </p>
        </div>

        <!-- What this does -->
        <div class="prose prose-slate dark:prose-invert max-w-none mb-10 text-sm">
          <p>When you confirm this request, we will:</p>
          <ul>
            <li>Deactivate your account and sign you out of all devices.</li>
            <li>Remove your name, email, phone number, profile photo, and password so they can no longer identify you.</li>
            <li>Delete your registered devices so you stop receiving notifications.</li>
          </ul>
          <p>
            Order, transaction, and payout records are kept in anonymized form as required for tax,
            accounting, and fraud-prevention obligations. They are no longer linked to any
            personally identifiable information.
          </p>
          <p>This cannot be undone.</p>
        </div>

        <!-- Step 1: Request code -->
        <form v-if="step === 'request'" @submit.prevent="handleRequest" class="space-y-6">
          <div>
            <label for="contact" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email or phone number on your account
            </label>
            <input
              id="contact"
              v-model="contact"
              type="text"
              required
              placeholder="you@example.com"
              class="block w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div v-if="error" class="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl">
            <span class="text-sm text-rose-700 dark:text-rose-400">{{ error }}</span>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center py-3 px-4 text-sm font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {{ loading ? 'Sending code...' : 'Send verification code' }}
          </button>
        </form>

        <!-- Step 2: Confirm with OTP -->
        <form v-else-if="step === 'confirm'" @submit.prevent="handleConfirm" class="space-y-6">
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Enter the verification code sent to <strong>{{ contact }}</strong>.
          </p>

          <div>
            <label for="otp" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Verification code
            </label>
            <input
              id="otp"
              v-model="otp"
              type="text"
              inputmode="numeric"
              maxlength="4"
              required
              placeholder="1234"
              class="block w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-center text-2xl tracking-[0.5em]"
            />
          </div>

          <div v-if="error" class="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl">
            <span class="text-sm text-rose-700 dark:text-rose-400">{{ error }}</span>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center py-3 px-4 text-sm font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {{ loading ? 'Deleting account...' : 'Permanently delete my account' }}
          </button>

          <button
            type="button"
            @click="step = 'request'"
            class="w-full text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Use a different email or phone number
          </button>
        </form>

        <!-- Done -->
        <div v-else class="text-center py-10" data-aos="fade-up">
          <div class="w-14 h-14 mx-auto mb-5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
            <svg class="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Account deleted</h2>
          <p class="text-slate-500 dark:text-slate-400">
            Your account and associated personal data have been removed.
          </p>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { requestAccountDeletion, confirmAccountDeletion } from '@/services/account-deletion.service'

const step = ref<'request' | 'confirm' | 'done'>('request')
const contact = ref('')
const otp = ref('')
const error = ref('')
const loading = ref(false)

const handleRequest = async () => {
  loading.value = true
  error.value = ''
  try {
    await requestAccountDeletion(contact.value.trim())
    step.value = 'confirm'
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Could not send a verification code. Please check your details and try again.'
  } finally {
    loading.value = false
  }
}

const handleConfirm = async () => {
  loading.value = true
  error.value = ''
  try {
    await confirmAccountDeletion(contact.value.trim(), otp.value.trim())
    step.value = 'done'
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Invalid or expired code. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<route lang="yaml">
meta:
  layout: false
</route>
