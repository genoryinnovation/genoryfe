<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center space-x-4">
      <router-link 
        to="/admin/partners" 
        class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </router-link>
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Create New Partner</h1>
        <p class="mt-1 text-sm text-slate-500">Add a new company partner to the platform</p>
      </div>
    </div>

    <!-- Form Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
        <div class="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Company Information</h3>
      </div>
      
      <form @submit.prevent="createPartner" class="p-6 space-y-6">
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div>
            <label for="employees" class="block text-sm font-medium text-slate-700 mb-2">Employee Count</label>
            <input
              type="number"
              id="employees"
              v-model="form.employeeCount"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="e.g. 50"
            />
          </div>
        </div>

        <div class="pt-6 flex justify-end space-x-3 border-t border-slate-100">
          <router-link
            to="/admin/partners"
            class="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            class="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 transition-all"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Partner
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  name: '',
  registrationNumber: '',
  industry: '',
  employeeCount: '',
});

const createPartner = async () => {
  // TODO: Implement API call
  console.log('Creating partner:', form);
  
  // Simulate success
  setTimeout(() => {
    router.push('/admin/partners');
  }, 1000);
};
</script>

<route lang="yaml">
meta:
  layout: admin
</route>
