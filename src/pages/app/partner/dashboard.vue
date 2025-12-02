<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="profile" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between mb-8">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Partner Dashboard
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Status: 
            <span :class="{
              'text-yellow-600': profile.status === 'pending',
              'text-green-600': profile.status === 'approved',
              'text-red-600': profile.status === 'rejected',
            }" class="font-medium capitalize">{{ profile.status }}</span>
          </p>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4" v-if="profile.status === 'approved'">
          <div class="flex items-center space-x-3">
            <span class="text-sm font-medium text-gray-700">
              {{ profile.isOnline ? 'Online' : 'Offline' }}
            </span>
            <button
              @click="toggleStatus"
              :class="[
                profile.isOnline ? 'bg-green-600' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              ]"
            >
              <span
                aria-hidden="true"
                :class="[
                  profile.isOnline ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Pending State -->
      <div v-if="profile.status === 'pending'" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: solid/exclamation -->
            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              Your application is currently under review. We will notify you once it's approved.
            </p>
          </div>
        </div>
      </div>

      <!-- Rejected State -->
      <div v-if="profile.status === 'rejected'" class="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              Your application has been rejected. Please contact support for more information.
            </p>
          </div>
        </div>
      </div>

      <!-- Stats Grid (Only for Approved) -->
      <div v-if="profile.status === 'approved'" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Total Earnings
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  ₦ {{ profile.earnings.total.toLocaleString() }}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Current Balance
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  ₦ {{ profile.earnings.balance.toLocaleString() }}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vehicle Info -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Vehicle Information
          </h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Type</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{{ profile.vehicle?.type }}</dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Make & Model</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ profile.vehicle?.make }} {{ profile.vehicle?.model }}</dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Plate Number</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ profile.vehicle?.plateNumber }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    
    <div v-else class="flex flex-col items-center justify-center h-screen">
       <p class="text-gray-500 mb-4">You are not a partner yet.</p>
       <button @click="router.push('/app/partner/onboarding')" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
         Become a Partner
       </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PartnerService, PartnerProfile } from '../../../services/partner.service';

const router = useRouter();
const profile = ref<PartnerProfile | null>(null);
const loading = ref(true);

const fetchProfile = async () => {
  try {
    const response = await PartnerService.getProfile();
    profile.value = response.data;
  } catch (error) {
    console.error('Failed to fetch profile', error);
    // If 404, profile remains null, showing "Become a Partner"
  } finally {
    loading.value = false;
  }
};

const toggleStatus = async () => {
  if (!profile.value) return;
  try {
    const newStatus = !profile.value.isOnline;
    await PartnerService.updateStatus(newStatus);
    profile.value.isOnline = newStatus;
  } catch (error) {
    console.error('Failed to update status', error);
    alert('Failed to update status');
  }
};

onMounted(() => {
  fetchProfile();
});
</script>
