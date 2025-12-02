<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
    
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Users -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.users?.total || 0 }}</dd>
        </div>
      </div>

      <!-- Total Partners -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Partners</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.partners?.total || 0 }}</dd>
        </div>
      </div>

      <!-- Total Products -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Total Products</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.products?.total || 0 }}</dd>
        </div>
      </div>

      <!-- Low Stock -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">Low Stock Items</dt>
          <dd class="mt-1 text-3xl font-semibold text-red-600">{{ stats.products?.lowStock || 0 }}</dd>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const stats = ref<any>({});

const fetchStats = async () => {
  try {
    const response = await api.get('/admin/dashboard/stats');
    if (response.data.success) {
      stats.value = response.data.data;
    }
  } catch (error) {
    console.error('Failed to fetch dashboard stats', error);
  }
};

onMounted(() => {
  fetchStats();
});
</script>
