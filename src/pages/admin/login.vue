<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Login Form -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="mb-10">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-2xl font-bold text-slate-900">Genory</span>
          </div>
        </div>

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p class="mt-2 text-slate-500">Sign in to access your admin dashboard</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-2">
              Email address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                placeholder="you@example.com"
                class="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-sm font-medium text-slate-700">
                Password
              </label>
              <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Forgot password?
              </a>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="Enter your password"
                class="block w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded transition-colors"
            />
            <label for="remember-me" class="ml-2 block text-sm text-slate-600">
              Keep me signed in
            </label>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-4 bg-rose-50 border border-rose-200 rounded-xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-rose-700">{{ error }}</span>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="relative w-full flex justify-center items-center py-3 px-4 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <!-- Footer -->
        <p class="mt-8 text-center text-sm text-slate-500">
          Don't have an account?
          <a href="#" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">Contact support</a>
        </p>
      </div>
    </div>

    <!-- Right Side - Decorative -->
    <div class="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-violet-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <!-- Content -->
      <div class="relative flex flex-col justify-center p-16">
        <div class="max-w-lg">
          <h2 class="text-4xl font-bold text-white mb-6">
            Manage your business with confidence
          </h2>
          <p class="text-lg text-slate-300 mb-8">
            Access powerful tools to track orders, manage inventory, and grow your partner network — all from one intuitive dashboard.
          </p>
          
          <!-- Features -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
                <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-slate-200">Real-time order tracking</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
                <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-slate-200">Advanced analytics & reporting</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
                <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-slate-200">Secure partner management</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../../services/admin/auth.service';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await AuthService.login({
      email: email.value,
      password: password.value,
    });

    if (response.success) {
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.admin));
      
      const role = response.data.admin.role;
      if (role === 'partner') {
        router.push('/partner');
      } else {
        router.push('/admin');
      }
    } else {
      throw new Error(response.message || 'Login failed');
    }
  } catch (err: any) {
    console.error(err);
    error.value = err.response?.data?.message || err.message || 'Login failed';
  } finally {
    loading.value = false;
  }
};
</script>
