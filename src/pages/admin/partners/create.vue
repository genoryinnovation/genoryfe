<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center space-x-4">
      <button
        @click="$router.push('/admin/partners')"
        class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Create New Partner</h1>
        <p class="mt-1 text-sm text-slate-500">Add a new company partner and provision its primary admin</p>
      </div>
    </div>

    <!-- Form Container -->
    <form @submit.prevent="createPartner" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Company Info -->
      <div class="lg:col-span-2 space-y-8">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
            <div class="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">Company Information</h3>
          </div>
          
          <div class="p-6 space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="e.g. Acme Corp"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="regNumber" class="block text-sm font-medium text-slate-700 mb-2">Registration Number</label>
                <input
                  type="text"
                  id="regNumber"
                  v-model="form.registrationNumber"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="e.g. RC123456"
                />
              </div>

              <div>
                <label for="industry" class="block text-sm font-medium text-slate-700 mb-2">Industry</label>
                <input
                  type="text"
                  id="industry"
                  v-model="form.industry"
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="e.g. Technology"
                />
              </div>
            </div>

            <div>
              <label for="employees" class="block text-sm font-medium text-slate-700 mb-2">Initial Employee Count</label>
              <input
                type="number"
                id="employees"
                v-model="form.employeeCount"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="e.g. 50"
              />
            </div>
          </div>
        </div>

        <!-- Primary Admin Section -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
            <div class="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">Primary Administrator</h3>
          </div>
          
          <div class="p-6 space-y-6">
            <p class="text-sm text-slate-500">This user will be created as the partner owner and will receive an email with their login credentials.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="adminFirstName" class="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                <input
                  type="text"
                  id="adminFirstName"
                  v-model="form.adminFirstName"
                  required
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Admin's first name"
                />
              </div>

              <div>
                <label for="adminLastName" class="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                <input
                  type="text"
                  id="adminLastName"
                  v-model="form.adminLastName"
                  required
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Admin's last name"
                />
              </div>
            </div>

            <div>
              <label for="adminEmail" class="block text-sm font-medium text-slate-700 mb-2">Administrative Email</label>
              <input
                type="email"
                id="adminEmail"
                v-model="form.adminEmail"
                required
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="admin@company.com"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Summary & Actions -->
      <div class="space-y-6">
        <div class="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/20">
          <h3 class="text-lg font-bold mb-4">Onboarding Summary</h3>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="mt-1 p-1 bg-emerald-500/20 rounded text-emerald-400">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-sm text-slate-300">New company entity will be registered in the system.</p>
            </div>
            <div class="flex items-start space-x-3">
              <div class="mt-1 p-1 bg-emerald-500/20 rounded text-emerald-400">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-sm text-slate-300">Dedicated partner admin account will be provisioned.</p>
            </div>
            <div class="flex items-start space-x-3">
              <div class="mt-1 p-1 bg-amber-500/20 rounded text-amber-400">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p class="text-sm text-slate-300">Credentials will be sent immediately via email.</p>
            </div>
          </div>

          <div class="mt-8 space-y-3">
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex items-center justify-center px-6 py-4 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 transition-all disabled:opacity-50"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Processing...' : 'Complete Partner Setup' }}
            </button>
            <button
              type="button"
              @click="$router.push('/admin/partners')"
              class="w-full px-6 py-4 text-sm font-bold rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- Tooltip/Help -->
        <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <div class="flex space-x-3 text-blue-800">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-xs leading-relaxed font-medium">
              After creation, the partner will be able to manage their own employees, orders, and wallet. All administrative actions taken by the primary admin will be logged.
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PartnerService } from '../../../services/admin/partner.service';

const router = useRouter();
const loading = ref(false);

const form = reactive({
  name: '',
  registrationNumber: '',
  industry: '',
  employeeCount: '',
  adminFirstName: '',
  adminLastName: '',
  adminEmail: '',
});

const createPartner = async () => {
  loading.value = true;
  try {
    await PartnerService.createPartner(form);
    // In a real app, use a toast notification
    alert('Partner created successfully! Admin credentials have been sent.');
    router.push('/admin/partners');
  } catch (error: any) {
    console.error('Failed to create partner', error);
    alert(error.response?.data?.message || 'An error occurred while creating the partner.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>

<route lang="yaml">
meta:
  layout: admin
</route>
