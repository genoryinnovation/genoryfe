<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="mb-10 flex items-center space-x-3">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span class="text-2xl font-bold text-slate-900">Genory</span>
      </div>

      <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
        <!-- Header -->
        <div class="mb-8">
          <div class="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-slate-900">Set your password</h1>
          <p class="mt-2 text-slate-500 text-sm">
            You're using a temporary password. Please set a new secure password to continue.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest">New Password</label>
            <div class="relative">
              <input
                v-model="newPassword"
                :type="showNew ? 'text' : 'password'"
                required
                minlength="8"
                placeholder="Minimum 8 characters"
                class="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              />
              <button type="button" @click="showNew = !showNew" class="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600">
                <svg v-if="!showNew" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
            <input
              v-model="confirmPassword"
              :type="showNew ? 'text' : 'password'"
              required
              placeholder="Re-enter your new password"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>

          <!-- Password strength hint -->
          <div v-if="newPassword" class="flex gap-1.5">
            <div v-for="i in 4" :key="i" :class="['h-1 flex-1 rounded-full transition-colors', i <= strength ? strengthColor : 'bg-slate-100']"></div>
          </div>

          <div v-if="error" class="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-medium">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 flex items-center justify-center"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Saving...' : 'Set Password & Continue' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../services/admin/auth.service';

const router = useRouter();
const newPassword = ref('');
const confirmPassword = ref('');
const showNew = ref(false);
const loading = ref(false);
const error = ref('');

const strength = computed(() => {
  const p = newPassword.value;
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score;
});

const strengthColor = computed(() => {
  if (strength.value <= 1) return 'bg-rose-400';
  if (strength.value === 2) return 'bg-amber-400';
  if (strength.value === 3) return 'bg-yellow-400';
  return 'bg-emerald-500';
});

const handleSubmit = async () => {
  error.value = '';
  if (newPassword.value.length < 8) {
    error.value = 'Password must be at least 8 characters.';
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  try {
    loading.value = true;
    await AuthService.changePassword(newPassword.value);

    // Update stored user to clear the flag
    const user = AuthService.getUser();
    if (user) {
      user.mustChangePassword = false;
      AuthService.setUser(user);
    }

    const updatedUser = AuthService.getUser();
    if (updatedUser?.partner) {
      router.push('/partner');
    } else {
      router.push('/admin');
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to update password. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<route lang="yaml">
meta:
  layout: false
</route>
