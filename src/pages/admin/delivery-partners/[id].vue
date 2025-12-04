<template>
  <div v-if="partner" class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div class="flex items-center space-x-4">
        <router-link
          to="/admin/delivery-partners"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </router-link>
        <div>
          <h2 class="text-2xl font-bold text-slate-900">
            {{ partner.user.firstName }} {{ partner.user.lastName }}
          </h2>
          <div class="mt-1 flex items-center space-x-3">
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 capitalize">
              <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              {{ partner.type }}
            </span>
            <span
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
              :class="{
                'bg-emerald-100 text-emerald-700': partner.status === 'approved',
                'bg-amber-100 text-amber-700': partner.status === 'pending',
                'bg-rose-100 text-rose-700': partner.status === 'rejected',
                'bg-slate-100 text-slate-600': partner.status === 'suspended'
              }"
            >
              <span 
                class="w-1.5 h-1.5 rounded-full mr-1.5"
                :class="{
                  'bg-emerald-500': partner.status === 'approved',
                  'bg-amber-500': partner.status === 'pending',
                  'bg-rose-500': partner.status === 'rejected',
                  'bg-slate-400': partner.status === 'suspended'
                }"
              ></span>
              {{ partner.status }}
            </span>
          </div>
        </div>
      </div>
      <div class="mt-4 lg:mt-0 flex space-x-3" v-if="partner.status === 'pending'">
        <button
          @click="rejectApplication"
          class="inline-flex items-center px-4 py-2.5 border border-rose-200 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reject
        </button>
        <button
          @click="approveApplication"
          class="inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25 transition-all"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Approve
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Personal Info -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">Personal Information</h3>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="text-sm text-slate-500">Full Name</span>
            <span class="text-sm font-medium text-slate-900">{{ partner.user.firstName }} {{ partner.user.lastName }}</span>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="text-sm text-slate-500">Email</span>
            <span class="text-sm font-medium text-slate-900">{{ partner.user.email }}</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <span class="text-sm text-slate-500">Phone</span>
            <span class="text-sm font-medium text-slate-900">{{ partner.user.phone?.code }} {{ partner.user.phone?.number }}</span>
          </div>
        </div>
      </div>

      <!-- Vehicle Info -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">Vehicle Information</h3>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="text-sm text-slate-500">Type</span>
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 capitalize">{{ partner.vehicle?.type }}</span>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="text-sm text-slate-500">Make & Model</span>
            <span class="text-sm font-medium text-slate-900">{{ partner.vehicle?.make }} {{ partner.vehicle?.model }}</span>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-slate-100">
            <span class="text-sm text-slate-500">Plate Number</span>
            <span class="px-2.5 py-1 bg-slate-100 text-slate-700 text-sm font-mono font-medium rounded-lg">{{ partner.vehicle?.plateNumber }}</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <span class="text-sm text-slate-500">Color</span>
            <div class="flex items-center space-x-2">
              <span class="w-4 h-4 rounded-full border border-slate-200" :style="{ backgroundColor: partner.vehicle?.color }"></span>
              <span class="text-sm font-medium text-slate-900 capitalize">{{ partner.vehicle?.color }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- KYC Info -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden lg:col-span-2">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center space-x-3">
          <div class="p-2 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">KYC Information</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-xs text-slate-500 uppercase tracking-wide font-medium">ID Type</p>
              <p class="mt-2 text-sm font-semibold text-slate-900">{{ partner.kyc.idType }}</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-xs text-slate-500 uppercase tracking-wide font-medium">ID Number</p>
              <p class="mt-2 text-sm font-semibold text-slate-900 font-mono">{{ partner.kyc.idNumber }}</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-xs text-slate-500 uppercase tracking-wide font-medium">ID Image</p>
              <a :href="partner.kyc.idImage" target="_blank" class="mt-2 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Image
              </a>
            </div>
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-xs text-slate-500 uppercase tracking-wide font-medium">Selfie</p>
              <a :href="partner.kyc.selfieImage" target="_blank" class="mt-2 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Selfie
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex flex-col items-center justify-center py-16">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
    <p class="mt-4 text-sm text-slate-500">Loading partner details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../../../services/api';

const route = useRoute();
const partner = ref<any>(null);

const fetchPartner = async () => {
  try {
    const response = await api.get(`/admin/delivery-partners/${route.params.id}`);
    partner.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch partner', error);
  }
};

const approveApplication = async () => {
  if (!confirm('Are you sure you want to approve this application?')) return;
  try {
    await api.patch(`/admin/delivery-partners/${route.params.id}/approve`);
    await fetchPartner();
    alert('Application approved');
  } catch (error) {
    console.error('Failed to approve', error);
    alert('Failed to approve application');
  }
};

const rejectApplication = async () => {
  const reason = prompt('Enter rejection reason:');
  if (!reason) return;
  
  try {
    await api.patch(`/admin/delivery-partners/${route.params.id}/reject`, { reason });
    await fetchPartner();
    alert('Application rejected');
  } catch (error) {
    console.error('Failed to reject', error);
    alert('Failed to reject application');
  }
};

onMounted(() => {
  fetchPartner();
});
</script>
